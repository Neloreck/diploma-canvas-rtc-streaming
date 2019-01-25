import {ReactContextManager} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";

// Lib.
import {Optional} from "@Lib/ts/types";
import {Logger} from "@Lib/utils";

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

// Data.
import {applicationConfig} from "@Main/data/configs";
import {authContextManager, routerContextManager} from "@Main/data/store";
import {sourceContextManager} from "@Module/stream/data/store";
import {LiveService} from "@Module/stream/lib/live/LiveService";
import {IGetActiveEventResponse} from "@Api/x-core/live/responses";

export interface ILiveContext {
  liveActions: {
    createEvent(name: string, description: string, secured: boolean, securedKey: string): Promise<ILiveEvent>;
    checkActiveEvent(): Promise<void>;
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
    liveEventLoading: boolean;
    socketOnline: boolean;
    rtcConnected: boolean;
  };
}

export class LiveContextManager extends ReactContextManager<ILiveContext> {

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
      liveEventLoading: false,
      rtcConnected: false,
      socketOnline: false
    }
  };

  private log: Logger = new Logger("[🌈C-LIV]", true);
  private liveService: LiveService = new LiveService();

  public constructor() {
    super();

    sourceContextManager.onInputChanged = this.onInputChanged;
    sourceContextManager.onOutputChanged = this.onOutputChanged;
  }

  @Bind()
  public dispose(): void {

    this.context.liveState = {
      live: false,
      liveEvent: null,
      liveEventLoading: false,
      rtcConnected: false,
      socketOnline: false
    };

    this.liveService.stop()
      .then();

    this.log.info("Disposed live storage.");
  }

  /*
   * Event management.
   */

  @Bind()
  public async createEvent(name: string, description: string, secured: boolean, securedKey: string): Promise<ILiveEvent> {

    if (this.context.liveState.liveEvent) {
      throw new Error("Cannot create new live event when already have one.");
    }

    this.updateStateRef();
    this.context.liveState.liveEventLoading = true;
    this.update();

    const eventResponse: IEventCreateResponse | IXCoreFailedResponse = await createLiveEvent({ name, description, secured, securedKey });

    if (eventResponse.success) {

      const liveEvent: ILiveEvent = (eventResponse as IEventCreateResponse).liveEvent;

      this.updateStateRef();
      this.context.liveState.liveEvent = liveEvent;
      this.context.liveState.liveEventLoading = false;
      this.update();

      this.log.info("Created live event.", liveEvent);

      return liveEvent;
    } else {

      this.updateStateRef();
      this.context.liveState.liveEventLoading = false;
      this.update();

      throw new Error(eventResponse.error.mesage);
    }
  }

  @Bind()
  public async checkActiveEvent(): Promise<void> {

    this.updateStateRef();
    this.context.liveState.liveEventLoading = true;
    this.update();

    const response: IGetActiveEventResponse | IXCoreFailedResponse = await checkActiveEvent();

    this.updateStateRef();

    if (response.success) {

      const activeLiveEvent: Optional<ILiveEvent> = (response as IGetActiveEventResponse).liveEvent;

      if (activeLiveEvent) {
        this.log.info("User already has live event created. Using it.");
        this.context.liveState.liveEvent = activeLiveEvent;
      }

    } else {
      this.log.error("Failed to check active live event:", response.error);
    }

    this.context.liveState.liveEventLoading = false;
    this.update();
  }

  @Bind()
  public async syncLiveEvent(eventId: string): Promise<ILiveEvent> {

    this.updateStateRef();
    this.context.liveState.liveEventLoading = true;
    this.update();

    const eventResponse: IGetEventResponse | IXCoreFailedResponse = await getLiveEvent(eventId);

    if (eventResponse.success) {

      const liveEvent: ILiveEvent = (eventResponse as IGetEventResponse).liveEvent;

      this.updateStateRef();
      this.context.liveState.liveEvent = liveEvent;
      this.context.liveState.liveEventLoading = false;
      this.update();

      this.log.info("Got event.", liveEvent);

      return liveEvent;
    } else {

      this.updateStateRef();
      this.context.liveState.liveEventLoading = false;
      this.update();

      this.log.info(`Failed to get event '${eventId}'.`);

      throw new Error(eventResponse.error.mesage);
    }
  }

  /*
   * SERVICE | SOCKET:
   */

  @Bind()
  public async start(): Promise<void> {

    const liveEvent: ILiveEvent = this.context.liveState.liveEvent as ILiveEvent;

    this.log.info("Starting live service, eventId:", liveEvent.id);
    this.liveService.onOnlineStatusChange = this.onOnlineStatusUpdated;

    await this.liveService.start(
      applicationConfig.serverLiveSocketUrl,
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

    this.updateStateRef();
    this.context.liveState.rtcConnected = true;
    this.update();
  }

  @Bind()
  public async disconnectWebRtc(): Promise<void> {

    await this.liveService.disconnectRTC();

    this.updateStateRef();
    this.context.liveState.rtcConnected = false;
    this.update();
  }

  /*
   * Streaming:
   */

  @Bind()
  protected async startStreaming(): Promise<void> {

    const liveEvent: ILiveEvent | null = this.context.liveState.liveEvent;

    if (!liveEvent) {
      throw new Error("Cannot connect, event is not provided.");
    }

    await this.liveService.startStream(liveEvent.id);

    this.updateStateRef();
    this.context.liveState.live = true;
    this.update();
  }

  @Bind()
  protected async stopStreaming(): Promise<void> {

    await this.liveService.stopStream();

    this.updateStateRef();
    this.context.liveState.live = false;
    this.update();
  }

  // State observing:

  @Bind()
  private onOnlineStatusUpdated(status: boolean): void {

    // Prevent odd renders.
    if (this.context.liveState.socketOnline === status) {
      return;
    }

    if (status === true && !this.context.liveState.rtcConnected && sourceContextManager.context.sourceState.outputStream) {
      this.connectWebRTC().then();
    }

    this.updateStateRef();
    this.context.liveState.socketOnline = status;
    this.update();
  }

  @Bind()
  private async onOutputChanged(stream: Optional<MediaStream>): Promise<void>  {

    if (this.context.liveState.socketOnline && !this.context.liveState.rtcConnected) {
      await this.connectWebRTC();
      // Update live.
    } else if (this.context.liveState.rtcConnected && stream) {
      this.liveService.updateVideoTrack(stream.getVideoTracks()[0]);
    }
  }

  @Bind()
  private async onInputChanged(stream: Optional<MediaStream>): Promise<void> {
    const audioTrack: Optional<MediaStreamTrack> = stream && stream.getAudioTracks()[0] || null;
    this.liveService.updateAudioTrack(audioTrack);
  }

  // Utility.

  @Bind()
  private updateStateRef(): void {
    this.context.liveState = Object.assign({}, this.context.liveState);
  }

}
