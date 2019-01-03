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
    startStreaming(): Promise<void>;
    stopStreaming(): Promise<void>;
  };
  liveState: {
    online: boolean;
    live: boolean;
  };
}

export class LiveContextManager extends ReactContextManager<ILiveContext> {

  protected context: ILiveContext = {
    liveActions: {
      start: this.start,
      startStreaming: this.startStreaming,
      stop: this.stop,
      stopStreaming: this.stopStreaming
    },
    liveState: {
      live: false,
      online: false
    }
  };

  private log: Logger = new Logger("[🌈C-LIV]", true);
  private liveService: LiveService = new LiveService();

  @Bind()
  public dispose(): void {

    this.context.liveState = {
      live: false,
      online: false
    };

    this.liveService.stop()
      .then();

    this.log.info("Disposed live storage.");
  }

  @Bind()
  public async start(): Promise<void> {
    this.log.info("Starting live service.");

    this.liveService.onOnlineStatusChange = this.onOnlineStatusUpdated;

    await this.liveService.start(
      applicationConfig.serverLiveSocketUrl,
      authContextManager.getCurrentUsername() as string,
      authContextManager.getAccessToken() as string
    ).then();
  }

  @Bind()
  public async stop(): Promise<void> {
    this.log.info("Stopping live service.");
    await this.liveService.stop();
  }

  @Bind()
  protected async startStreaming(): Promise<void> {

    this.updateStateRef();
    this.context.liveState.live = true;
    this.update();

    await this.liveService.startStreaming((sourceContextManager.context.sourceState.outputStream as MediaStream).getTracks());
  }

  @Bind()
  protected async stopStreaming(): Promise<void> {
    this.updateStateRef();
    this.context.liveState.live = false;
    this.update();

    await this.liveService.stopStreaming();
  }

  @Bind()
  protected onOnlineStatusUpdated(status: boolean): void {

    // Prevent odd renders.
    if (this.context.liveState.online === status) {
      return;
    }

    this.updateStateRef();
    this.context.liveState.online = status;
    this.update();
  }

  @Bind()
  protected updateStateRef(): void {
    this.context.liveState = Object.assign({}, this.context.liveState);
  }

}
