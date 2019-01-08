import {Bind} from "@redux-cbd/utils";
import {IMessage} from "@stomp/stompjs/esm5/i-message";

// Lib.
import {AbstractWebSocketController} from "@Lib/socket/AbstractWebSocketController";
import {Optional} from "@Lib/ts/types";
import {Logger} from "@Lib/utils";
import {ILiveSocketMessage, ISdpExchangeMessage} from "@Module/stream/lib/live/messaging";

export class LiveWebSocketController extends AbstractWebSocketController {

  public socketUrl: Optional<string> = null;

  protected sessionId: Optional<string> = null;
  protected accessToken: Optional<string> = null;

  protected readonly destinationPrefix: string;
  protected readonly receivalPrefix: string;

  private readonly log: Logger = new Logger("[🌈LIVE-WS]");

  private timer: Optional<any> = null;
  private readonly statusCheckInterval: number = 2000;

  public constructor(destinationPrefix: string, receivalPrefix: string) {
    super();

    this.destinationPrefix = destinationPrefix;
    this.receivalPrefix = receivalPrefix;

    this.client.debug = () => { /* RESTRICTED */ };
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

  @Bind()
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
  public onStatusChanged(status: boolean): void {
    throw new Error("Handler for 'onStatusChanged' should be injected.");
  }

  @Bind()
  public onSessionExchangeCompleted(): void {
    throw new Error("Handler for 'onSessionExchangeCompleted' should be injected.");
  }

  @Bind()
  public async onSdpAnswerReceived(message: ISdpExchangeMessage): Promise<void> {
    throw new Error("Handler for 'onSdpAnswerReceived' should be injected.");
  }

  @Bind()
  public onICECandidateReceived(message: ILiveSocketMessage): void {
    throw new Error("Handler for 'onICECandidateReceived' should be injected.");
  }

  @Bind()
  public async onErrorReceived(message: ILiveSocketMessage): Promise<void> {
    throw new Error("Handler for 'onErrorReceived' should be injected.");
  }

  // Implementation.

  @Bind()
  protected subscribe(): void {

    this.addSubscription(`record.start`, (message: IMessage) => console.error("start rec", message));
    this.addSubscription(`record.stop`, (message: IMessage) => console.error("stop rec", message));

    this.addSubscription(`session.sdpAnswer`, (message: IMessage) =>  this.onSdpAnswerReceived(JSON.parse(message.body)));
    this.addSubscription(`session.iceCandidate`, (message: IMessage) =>  this.onICECandidateReceived(JSON.parse(message.body)));
    this.addSubscription(`session.error`, (message: IMessage) =>  this.onErrorReceived(JSON.parse(message.body)));
    this.addSubscription(`session.complete`, (message: IMessage) => this.onSessionExchangeCompleted());

    this.addSubscription(`status`, this.onLogMessage);
  }

  // Listeners.

  @Bind()
  protected onLogMessage(message: IMessage): void {
    this.log.error("LOG", JSON.parse(message.body));
  }

}
