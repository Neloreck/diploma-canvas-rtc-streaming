import {Bind} from "@redux-cbd/utils";

// Lib.
import {Optional} from "@Lib/ts/types";
import {Logger} from "@Lib/utils";
import {LiveWebRtcController} from "@Module/stream/lib/live/LiveWebRtcController";
import {LiveWebSocketController} from "@Module/stream/lib/live/LiveWebSocketController";
import {ELiveSocketMessageType, ISdpExchangeMessage} from "@Module/stream/lib/live/messaging";

export class LiveService {

  private started: boolean = false;
  private online: boolean = false;

  private readonly log: Logger = new Logger("[🌈LIVE]");
  private readonly liveWebRtcController: LiveWebRtcController = new LiveWebRtcController();
  private readonly liveWebSocketController: LiveWebSocketController = new LiveWebSocketController();

  private accessToken: Optional<string> = null;
  private socketUrl: Optional<string> = null;
  private sessionId: Optional<string> = null;

  public constructor() {

    this.liveWebRtcController.onSDPGenerationError = this.onLocalSDPOfferGenerationError;
    this.liveWebRtcController.onSDPOfferGenerated = this.onLocalSDPOfferGenerated;

    this.liveWebSocketController.onStatusChanged = this.handleStatusChange;
    this.liveWebSocketController.onSdpAnswerReceived = this.onRemoteSDPOfferReceived;
  }

  @Bind()
  public isStarted(): boolean {
    return this.started;
  }

  /*
   * External.
   */

  @Bind()
  public handleStatusChange(online: boolean): void {
    this.online = online;
    this.onOnlineStatusChange(online);
  }

  public onOnlineStatusChange(status: boolean): void { /* INJECT */ }

  /*
   * Control.
   */

  @Bind()
  public async start(socketUrl: string, sessionId: string, accessToken: string): Promise<void> {

    this.log.info(`Starting live service: session: '${sessionId}', socket: '${socketUrl}'.`);

    this.started = true;

    this.accessToken = accessToken;
    this.socketUrl = socketUrl;
    this.sessionId = sessionId;

    await this.connectWebSocket();

    this.log.info(`Started live service.`);
  }

  @Bind()
  public async stop(): Promise<void> {

    this.log.info(`Stopping service.`);

    this.started = false;

    this.accessToken = null;
    this.socketUrl = null;
    this.sessionId = null;

    await this.disconnectWebRtc();
    await this.disconnectWebSocket();
  }

  @Bind()
  public async startStream(): Promise<void> {
    this.log.info(`Starting stream.`);
    await this.connectWebRtc();
  }

  @Bind()
  public async stopStream(): Promise<void> {
    this.log.info(`Stopping stream.`);
    await this.disconnectWebRtc();
  }

  /*
   * Management.
   */

  @Bind()
  private async connectWebSocket(): Promise<void> {
    this.liveWebSocketController.connect(this.socketUrl, this.sessionId, this.accessToken);
  }

  @Bind()
  private async disconnectWebSocket(): Promise<void> {
    this.liveWebSocketController.disconnect();
  }

  @Bind()
  private async connectWebRtc(): Promise<void> {
    await this.liveWebRtcController.start(
      {} as RTCConfiguration,
      {
        iceRestart: true,
        offerToReceiveAudio: false,
        offerToReceiveVideo: false
      }
    );
  }

  @Bind()
  private async disconnectWebRtc(): Promise<void> {
    await this.liveWebRtcController.stop();
  }

  /*
   * Interaction bridge.
  */

  @Bind()
  private onLocalSDPOfferGenerated(offer: RTCSessionDescriptionInit): void {
    this.liveWebSocketController.sendMessage("sdpOffer", {
      body: {
        sdp: offer.sdp
      },
      type: ELiveSocketMessageType.SDP_OFFER
    });
  }

  @Bind()
  private onRemoteSDPOfferReceived(message: ISdpExchangeMessage): void {
    this.liveWebRtcController.handleSDPAnswer(message.body.sdp);
  }

  @Bind()
  private onLocalSDPOfferGenerationError(error: Error): void {
    console.error(error);
  }

}
