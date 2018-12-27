import {ReactContextManager} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";

// Lib.
import {Logger} from "@Lib/utils";

// Data.
import {applicationConfig} from "@Main/data/config";
import {authContextManager} from "@Main/data/store";
import {LiveWebSocketController} from "@Module/stream/data/store/connection/LiveWebSocketController";

export interface IConnectionContext {
  connectionActions: {
    connect(): void;
    disconnect(): void;
    goLive(): void;
  };
  connectionState: {
    online: boolean;
    live: boolean;
  };
}

export class ConnectionContextManager extends ReactContextManager<IConnectionContext> {

  protected context: IConnectionContext = {
    connectionActions: {
      connect: this.connect,
      disconnect: this.disconnect,
      goLive: this.goLive
    },
    connectionState: {
      live: false,
      online: false
    }
  };

  private log: Logger = new Logger("[🌈SOCK]", true);
  private controller: LiveWebSocketController = new LiveWebSocketController(applicationConfig.serverLiveSocketUrl);

  @Bind()
  public connect(): void {
    this.log.info("Connecting to socket.");
    this.controller.onStatusChanged = this.onOnlineStatusUpdated;
    this.controller.connect(authContextManager.getCurrentUsername() || undefined, authContextManager.getAccessToken() || undefined);
  }

  @Bind()
  public disconnect(): void {
    this.log.info("Disconnecting from socket.");
    this.controller.disconnect();
  }

  @Bind()
  protected goLive(): void {
    this.log.info("Going live...");
    this.updateStateRef();
    this.context.connectionState.live = true;
    this.update();
  }

  @Bind()
  protected onOnlineStatusUpdated(status: boolean): void {
    this.updateStateRef();
    this.context.connectionState.online = status;
    this.update();
  }

  @Bind()
  protected updateStateRef(): void {
    this.context.connectionState = Object.assign({}, this.context.connectionState);
  }

}
