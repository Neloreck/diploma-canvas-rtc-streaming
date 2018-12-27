import {Bind} from "@redux-cbd/utils";

import {Client, IFrame, IMessage, messageCallbackType, StompSubscription} from "@stomp/stompjs";
import {default as SockJS} from "sockjs-client";

export abstract class AbstractWebSocketController {

  protected readonly client: Client;
  protected subscriptions: Array<StompSubscription> = [];

  protected abstract readonly destinationPrefix: string;

  public constructor(socketUrl: string) {
    this.client = new Client();
    this.client.webSocketFactory = () => new SockJS(socketUrl);

    this.client.onConnect = this.onConnected;
  }

  @Bind()
  public isConnected(): boolean {
    return this.client.webSocket.readyState === WebSocket.OPEN;
  }

  /*
   * Handlers implementation.
   */

  public abstract sendMessage(destination: string, message: string): void;

  @Bind()
  public addSubscription(mapping: string, handler: messageCallbackType): StompSubscription {
    const subscription: StompSubscription = this.client.subscribe(mapping, handler);
    this.subscriptions.push(subscription);
    return subscription;
  }

  @Bind()
  public removeSubscription(subscription: StompSubscription) {
    this.client.unsubscribe(subscription.id);
    this.subscriptions = this.subscriptions.filter((it) => it.id !== subscription.id);
  }

  /*
   * Lifecycle.
   */

  @Bind()
  public connect(): void {
    this.client.activate();
  }

  @Bind()
  public disconnect(): void {
    this.unsubscribe();
    this.client.deactivate();
  }

  @Bind()
  protected onConnected(frame: IFrame): void {
    if (this.subscriptions.length === 0) {
      this.subscribe();
    }
  }

  // Subscription.

  protected abstract onMessage(message: IMessage): void;

  protected abstract subscribe(): void;

  @Bind()
  protected unsubscribe(): void {
    this.subscriptions.forEach((it) => this.client.unsubscribe(it.id));
  }

}
