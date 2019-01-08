import {ReactContextManager} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";

// Lib.
import {Logger} from "@Lib/utils";

// Data.
import {applicationConfig} from "@Main/data/config";
import {authContextManager} from "@Main/data/store";
import {sourceContextManager} from "@Module/stream/data/store";
import {LiveService} from "@Module/stream/lib/live/LiveService";

export interface ILiveContext {
  liveActions: {
    start(): Promise<void>;
    stop(): Promise<void>;
    connectRTC(): Promise<void>;
    disconnectRTC(): Promise<void>;
    startStreaming(): Promise<void>;
    stopStreaming(): Promise<void>;
  };
  liveState: {
    socketOnline: boolean;
    rtcConnected: boolean;
    live: boolean;
  };
}

export class LiveContextManager extends ReactContextManager<ILiveContext> {

  protected context: ILiveContext = {
    liveActions: {
      connectRTC: this.connectWebRTC,
      disconnectRTC: this.disconnectWebRtc,
      start: this.start,
      startStreaming: this.startStreaming,
      stop: this.stop,
      stopStreaming: this.stopStreaming
    },
    liveState: {
      live: false,
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
      rtcConnected: false,
      socketOnline: false
    };

    this.liveService.stop()
      .then();

    this.log.info("Disposed live storage.");
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
      authContextManager.getCurrentUsername() as string,
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

    await this.liveService.connectRTC([
      ...(sourceContextManager.context.sourceState.outputStream as MediaStream).getVideoTracks(),
      ...(sourceContextManager.context.sourceState.inputStream as MediaStream).getAudioTracks()
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
   * WEB RTC:
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
