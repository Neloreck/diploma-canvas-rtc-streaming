import {Bind} from "@redux-cbd/utils";
import {IMessage} from "@stomp/stompjs/esm5/i-message";

// Lib.
import {AbstractWebSocketController} from "@Lib/socket/AbstractWebSocketController";
import {Optional} from "@Lib/ts/types";
import {Logger} from "@Lib/utils";
import {ISdpExchangeMessage} from "@Module/stream/lib/live/messaging";

export class LiveWebSocketController extends AbstractWebSocketController {

  public socketUrl: Optional<string> = null;

  protected sessionId: Optional<string> = null;
  protected accessToken: Optional<string> = null;

  protected readonly destinationPrefix: string = "/app/live";
  protected readonly recievalPrefix: string = "/topic/live";

  private readonly log: Logger = new Logger("[🌈LIVE-WS]");

  private timer: Optional<any> = null;
  private readonly statusCheckInterval: number = 2000;

  public constructor() {
    super();

    this.client.debug = this.log.debug.bind(this.log);
  }

  @Bind()
  public connect(socketUrl?: string | null, sessionId?: string | null, accessToken?: string | null): void {

    if (!socketUrl || !sessionId || !accessToken) {
      throw new Error("Cannot create session for socket connection, session and token should be provided.");
    } else {
      this.socketUrl = socketUrl;
      this.sessionId = sessionId;
      this.accessToken = accessToken;
    }

    this.log.info("Activating socket connection.");

    this.timer = setInterval(() => this.onStatusChanged(this.isConnected()), this.statusCheckInterval);

    super.connect();
  }

  public disconnect(): void {

    this.log.info("Deactivating socket connection.");

    // Set offline.
    this.onStatusChanged(false);
    clearInterval(this.timer);

    this.timer = null;
    this.sessionId = null;
    this.socketUrl = null;
    this.accessToken = null;

    super.disconnect();
  }

  // Handlers.

  @Bind()
  public onStatusChanged(status: boolean): void { /* Handler injectable. */ }

  @Bind()
  public onSdpAnswerReceived(message: ISdpExchangeMessage): void {
    throw new Error("Handler should be injected.");
  }

  // Implementation.

  @Bind()
  protected subscribe(): void {
    this.addSubscription(`sdpAnswer`, (message: IMessage) =>  this.onSdpAnswerReceived(JSON.parse(message.body)));
    this.addSubscription(`status`, this.onLogMessage);
  }

  // Listeners.

  @Bind()
  protected onLogMessage(message: IMessage): void {
    this.log.error("LOG", JSON.parse(message.body));
  }

}
