import {Bind} from "@redux-cbd/utils";

// Lib.
import {AbstractWebSocketController} from "@Lib/socket/AbstractWebSocketController";
import {Optional} from "@Lib/ts/types";
import {Logger} from "@Lib/utils";

export class LiveWebSocketController extends AbstractWebSocketController {

  protected readonly destinationPrefix: string = "/app/status";
  protected readonly recievalPrefix: string = "/topic/status";

  protected log: Logger = new Logger("[⛳WS]");
  protected user: Optional<string> = null;

  private timer: Optional<any> = null;
  private statusCheckInterval: number = 2000;

  public constructor(socketUrl: string) {
    super(socketUrl);

    this.client.debug = this.log.debug.bind(this.log);
  }

  @Bind()
  public connect(user?: string, token?: string): void {

    if (!user || !token) {
      throw new Error("Cannot identify user for socket connection.");
    }

    this.log.info(`Authorizing as '${user}'.`);

    this.user = user;
    this.timer = setInterval(() => this.onStatusChanged(this.isConnected()), this.statusCheckInterval);
    this.client.configure({ connectHeaders: { access_token: token } });

    super.connect();
  }

  public disconnect(): void {
    super.disconnect();

    // Set offline.
    this.onStatusChanged(false);
    clearInterval(this.timer);
    this.timer = null;

    // Remove user.
    this.user = null;
  }

  // Handlers.

  @Bind()
  public onStatusChanged(status: boolean): void {
    // Handler.
  }

  // Implementation.

  @Bind()
  public sendMessage(message: string): void {
    this.client.publish({ destination: `${this.destinationPrefix}.${this.user}`, body: message });
  }

  @Bind()
  protected onMessage(...rest: Array<any>): void {
    this.log.error(...rest);
  }

  @Bind()
  protected subscribe(): void {
    this.addSubscription(`${this.recievalPrefix}.${this.user}`, this.onMessage);
  }

}
