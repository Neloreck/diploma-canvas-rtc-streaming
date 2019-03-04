import { Bind, ContextManager } from "dreamstate";

// Lib.
import { Optional } from "@Lib/ts/types";
import { Logger } from "@Lib/utils";

// Api.
import {
  checkActiveEvent,
  createLiveEvent,
  getLiveEvent,
  IEventCreateResponse,
  IGetEventResponse,
  ILiveEvent,
  IXCoreFailedResponse
} from "@Api/x-core";
import { IGetActiveEventResponse } from "@Api/x-core/live";

// Data.
import { applicationConfig } from "@Main/data/configs/ApplicationConfig";
import { authContextManager, routerContextManager } from "@Main/data/store";
import { sourceContextManager } from "@Module/stream/data/store";
import { ELiveEventStatus } from "@Module/stream/data/store/live/types";
import { LiveService } from "@Module/stream/lib/live/LiveService";

export interface ILiveContext {
  liveActions: {
    createEvent(name: string, description: string, secured: boolean, securedKey: string): Promise<ILiveEvent>;
    checkActiveEvent(): Promise<Optional<ILiveEvent>>;
    syncLiveEvent(eventId: string): Promise<ILiveEvent>;
    start(): Promise<void>;
    stop(): Promise<void>;
    connectRTC(): Promise<void>;
    disconnectRTC(): Promise<void>;
    startStreaming(): Promise<void>;
    stopStreaming(): Promise<void>;
  };
  liveState: {
    live: boolean;
    liveEvent: Optional<ILiveEvent>;
    liveEventStatus: ELiveEventStatus,
    socketConnected: boolean;
    rtcConnected: boolean;
  };
}

export class LiveContextManager extends ContextManager<ILiveContext> {

  public context: ILiveContext = {
    liveActions: {
      checkActiveEvent: this.checkActiveEvent,
      connectRTC: this.connectWebRTC,
      createEvent: this.createEvent,
      disconnectRTC: this.disconnectWebRtc,
      start: this.start,
      startStreaming: this.startStreaming,
      stop: this.stop,
      stopStreaming: this.stopStreaming,
      syncLiveEvent: this.syncLiveEvent
    },
    liveState: {
      live: false,
      liveEvent: null,
      liveEventStatus: ELiveEventStatus.ABSENT,
      rtcConnected: false,
      socketConnected: false
    }
  };

  private readonly log: Logger = new Logger("[🌈C-LIV]", true);
  private readonly liveService: LiveService = new LiveService();
  private readonly setState = ContextManager.getSetter(this, "liveState");

  public constructor() {

    super();

    sourceContextManager.onInputChanged = this.onInputChanged;
    sourceContextManager.onOutputChanged = this.onOutputChanged;

    this.liveService.onOnlineStatusChange = this.onOnlineStatusUpdated;
    this.liveService.onRecordStartReceived = this.onRecordStarted;
    this.liveService.onRecordStopReceived = this.onRecordFinished;
  }

  /*
   * Event management.
   */

  @Bind()
  public async createEvent(name: string, description: string, secured: boolean, securedKey: string): Promise<ILiveEvent> {

    if (this.context.liveState.liveEvent) {
      throw new Error("Cannot create new live event when already have one.");
    }

    this.setState({ liveEventStatus: ELiveEventStatus.CREATING });

    const eventResponse: IEventCreateResponse | IXCoreFailedResponse = await createLiveEvent({ name, description, secured, securedKey });

    if (eventResponse.success) {

      const liveEvent: ILiveEvent = (eventResponse as IEventCreateResponse).liveEvent;

      this.setState({
        liveEvent,
        liveEventStatus: ELiveEventStatus.PREVIEW
      });

      this.log.info("Created live event.", liveEvent);

      return liveEvent;
    } else {

      this.setState({ liveEventStatus: ELiveEventStatus.ABSENT });

      throw new Error(eventResponse.error.mesage);
    }
  }

  @Bind()
  public async checkActiveEvent(): Promise<Optional<ILiveEvent>> {

    this.setState({ liveEventStatus: ELiveEventStatus.LOADING });

    const response: IGetActiveEventResponse | IXCoreFailedResponse = await checkActiveEvent();

    let activeLiveEvent: Optional<ILiveEvent> = null;

    if (response.success) {

      activeLiveEvent = (response as IGetActiveEventResponse).liveEvent;

      if (activeLiveEvent) {
        this.log.info("User already has live event created. Using it.");

        this.setState({
          liveEvent: activeLiveEvent,
          liveEventStatus: activeLiveEvent.finished ? ELiveEventStatus.FINISHED : ELiveEventStatus.PREVIEW
        });
      } else {
        this.setState({ liveEventStatus: ELiveEventStatus.ABSENT });
      }
    } else {
      this.log.error("Failed to check active live event:", response.error);

      this.setState({ liveEventStatus: ELiveEventStatus.ABSENT });
    }

    return activeLiveEvent;
  }

  @Bind()
  public async syncLiveEvent(eventId: string): Promise<ILiveEvent> {

    this.setState({ liveEventStatus: ELiveEventStatus.LOADING });

    const eventResponse: IGetEventResponse | IXCoreFailedResponse = await getLiveEvent(eventId);

    if (eventResponse.success) {

      const liveEvent: ILiveEvent = (eventResponse as IGetEventResponse).liveEvent;

      this.setState({
        liveEvent,
        liveEventStatus: liveEvent.finished ? ELiveEventStatus.FINISHED : ELiveEventStatus.PREVIEW
      });

      this.log.info("Got event.", liveEvent);

      return liveEvent;
    } else {

      this.setState({
        liveEventStatus: ELiveEventStatus.ABSENT
      });

      this.log.info(`Failed to get event '${eventId}'.`);

      throw new Error(eventResponse.error.message);
    }
  }

  /*
   * SERVICE | SOCKET:
   */

  @Bind()
  public async start(): Promise<void> {

    const { liveEvent } = this.context.liveState;

    if (!liveEvent) {
      throw new Error("Failed to start event. No event present in storage.");
    }

    this.log.info("Starting live service, eventId:", liveEvent.id);

    await this.liveService.start(
      applicationConfig.SERVER_LIVE_SOCKET_URL,
      liveEvent.id,
      authContextManager.getAccessToken() as string
    );
  }

  @Bind()
  public async stop(): Promise<void> {

    this.log.info("Stopping live service.");

    await this.liveService.stop();
  }

  /*
   * WEB RTC:
   */

  @Bind()
  public async connectWebRTC(): Promise<void> {

    if (!sourceContextManager.context.sourceState.outputStream) {
      this.log.warn("Cancel WebRTC start, reason - component is unmounting or stream permissions were erased.");
      return;
    }

    await this.liveService.connectRTC(
      sourceContextManager.context.sourceState.outputStream.getVideoTracks()[0],
      sourceContextManager.context.sourceState.inputStream && sourceContextManager.context.sourceState.inputStream.getAudioTracks()[0] || null
    );

    this.setState({ rtcConnected: true });
  }

  @Bind()
  public async disconnectWebRtc(): Promise<void> {

    await this.liveService.disconnectRTC();

    this.setState({ rtcConnected: false });
  }

  /*
   * Streaming:
   */

  @Bind()
  public async startStreaming(): Promise<void> {

    const { liveEvent } = this.context.liveState;

    if (!liveEvent) {
      throw new Error("Cannot connect, event is not provided.");
    }

    await this.liveService.startStream(liveEvent.id);

    this.setState({ live: true });
  }

  @Bind()
  public async stopStreaming(): Promise<void> {

    await this.liveService.stopStream();

    this.setState({ live: false });
  }

  // State observing:

  @Bind()
  public onOnlineStatusUpdated(status: boolean): void {

    const { rtcConnected, socketConnected: currentStatus } = this.context.liveState;

    // Prevent odd renders.
    if (currentStatus === status) {
      return;
    }

    if (status === true && !rtcConnected && sourceContextManager.context.sourceState.outputStream) {
      this.connectWebRTC().then();
    }

    this.setState({ socketConnected: status });
  }

  @Bind()
  public onRecordStarted(): void {
    this.log.info("Record successfully started.");
  }

  @Bind()
  public async onRecordFinished(): Promise<void> {

    const { liveState: { liveEvent } } = this.context;

    this.log.info("Record successfully stopped.");

    if (!liveEvent) {
      throw new Error("Got totally unexpected error. No events present while stopping record.");
    }

    liveEvent.finished = true;

    this.setState({ liveEvent, liveEventStatus: ELiveEventStatus.FINISHED });

    routerContextManager.replace(`/stream/stats/${liveEvent.id}`);
  }

  // Input changes handling.

  @Bind()
  public async onOutputChanged(stream: Optional<MediaStream>): Promise<void>  {

    if (this.context.liveState.socketConnected && !this.context.liveState.rtcConnected) {
      await this.connectWebRTC();
      // Update live.
    } else if (this.context.liveState.rtcConnected && stream) {
      this.liveService.updateVideoTrack(stream.getVideoTracks()[0]);
    }
  }

  @Bind()
  public async onInputChanged(stream: Optional<MediaStream>): Promise<void> {

    const audioTrack: Optional<MediaStreamTrack> = stream && stream.getAudioTracks()[0] || null;
    this.liveService.updateAudioTrack(audioTrack);
  }

  // Utility.

  protected onProvisionEnded(): void {

    this.context.liveState = {
      live: false,
      liveEvent: null,
      liveEventStatus: ELiveEventStatus.ABSENT,
      rtcConnected: false,
      socketConnected: false
    };

    this.liveService.stop().then(() => this.log.info("Disposed live storage."));
  }

}
