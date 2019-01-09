import {ReactContextManager} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";

// Lib.
import {Optional} from "@Lib/ts/types";
import {Logger} from "@Lib/utils";

// Api.
import {liveClient} from "@Api/x-core";
import {IXCoreFailedResponse} from "@Api/x-core/general/IXCoreFailedResponse";
import {ILiveEvent} from "@Api/x-core/live/models";
import {IEventCreateResponse} from "@Api/x-core/live/response/IEventCreateResponse";
import {IGetEventResponse} from "@Api/x-core/live/response/IGetEventResponse";

// Data.
import {applicationConfig} from "@Main/data/config";
import {authContextManager} from "@Main/data/store";
import {sourceContextManager} from "@Module/stream/data/store";
import {LiveService} from "@Module/stream/lib/live/LiveService";

export interface ILiveContext {
  liveActions: {
    createEvent(name: string, description: string, secured: boolean, securedKey: string): Promise<ILiveEvent>;
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

  protected context: ILiveContext = {
    liveActions: {
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

    const eventResponse: IEventCreateResponse | IXCoreFailedResponse = await liveClient.createLiveEvent({ name, description, secured, securedKey });

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
  public async syncLiveEvent(eventId: string): Promise<ILiveEvent> {

    this.updateStateRef();
    this.context.liveState.liveEventLoading = true;
    this.update();

    const eventResponse: IGetEventResponse | IXCoreFailedResponse = await liveClient.getLiveEvent(eventId);

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
    this.log.info("Starting live service.");

    this.liveService.onOnlineStatusChange = this.onOnlineStatusUpdated;

    await this.liveService.start(
      applicationConfig.serverLiveSocketUrl,
      (this.context.liveState.liveEvent as ILiveEvent).id,
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

    if (!sourceContextManager.context.sourceState.inputStream || !sourceContextManager.context.sourceState.outputStream) {
      this.log.warn("Cancel WebRTC start, reason - component is unmounting or stream permissions were erased.");
      return;
    }

    await this.liveService.connectRTC([
      ...sourceContextManager.context.sourceState.outputStream.getVideoTracks(),
      ...sourceContextManager.context.sourceState.inputStream .getAudioTracks()
    ]);

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

    await this.liveService.startStream();

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
  protected onOnlineStatusUpdated(status: boolean): void {

    // Prevent odd renders.
    if (this.context.liveState.socketOnline === status) {
      return;
    }

    this.updateStateRef();
    this.context.liveState.socketOnline = status;
    this.update();
  }

  // Utility.

  @Bind()
  private updateStateRef(): void {
    this.context.liveState = Object.assign({}, this.context.liveState);
  }

}
