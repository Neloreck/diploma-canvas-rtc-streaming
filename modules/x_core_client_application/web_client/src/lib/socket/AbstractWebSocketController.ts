import { Bind } from "@redux-cbd/utils";
import { Client, IFrame, messageCallbackType, StompSubscription } from "@stomp/stompjs";
import { default as SockJS } from "sockjs-client";

import { IAbstractWebSocketMessage } from "./IAbstractWebSocketMessage";

export abstract class AbstractWebSocketController {

  protected abstract sessionId: string | null;
  protected abstract socketUrl: string | null;
  protected abstract accessToken: string | null;

  protected abstract readonly destinationPrefix: string;
  protected abstract readonly receivalPrefix: string;

  protected readonly client: Client;
  protected subscriptions: Array<StompSubscription> = [];

  public constructor() {
    this.client = new Client();
    this.client.onConnect = this.onConnected;
  }

  @Bind()
  public isConnected(): boolean {
    return this.client.webSocket.readyState === WebSocket.OPEN;
  }

  @Bind()
  public setAccessToken(url: string | null): void {
    this.accessToken = url;
  }

  /*
   * Handlers implementation.
   */

  @Bind()
  public sendMessage(mapping: string, message: IAbstractWebSocketMessage): void {
    this.client.publish({ destination: `${this.destinationPrefix}.${this.sessionId}.${mapping}`, body: JSON.stringify(message) });
  }

  @Bind()
  public addSubscription(mapping: string, handler: messageCallbackType): StompSubscription {
    const subscription: StompSubscription = this.client.subscribe(`${this.receivalPrefix}.${this.sessionId}.${mapping}`, handler);
    this.subscriptions.push(subscription);
    return subscription;
  }

  @Bind()
  public removeSubscription(subscription: StompSubscription): void {
    this.client.unsubscribe(subscription.id);
    this.subscriptions = this.subscriptions.filter((it: StompSubscription): boolean => it.id !== subscription.id);
  }

  /*
   * Lifecycle.
   */

  @Bind()
  public connect(): void {
    this.client.webSocketFactory = (): any => new SockJS(`${this.socketUrl}?access_token=${this.accessToken}`);
    this.client.activate();
  }

  @Bind()
  public disconnect(): void {
    this.unsubscribe();
    this.client.deactivate();

    if (this.client.webSocket) {
      this.client.webSocket.close();
    }
  }

  @Bind()
  protected onConnected(frame: IFrame): void {
    if (this.subscriptions.length === 0) {
      this.subscribe();
    }
  }

  // Subscription.

  protected abstract subscribe(): void;

  @Bind()
  protected unsubscribe(): void {
    for (const subscription of this.subscriptions) {
      this.client.unsubscribe(subscription.id);
    }

    this.subscriptions = [];
  }

}
