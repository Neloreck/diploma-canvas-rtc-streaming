import {Bind} from "@redux-cbd/utils";

// Lib.
import {Optional} from "@Lib/ts/types";
import {Logger} from "@Lib/utils";
import {LiveWebRtcController} from "@Module/stream/lib/live/LiveWebRtcController";
import {LiveWebSocketController} from "@Module/stream/lib/live/LiveWebSocketController";
import {ELiveSocketMessageType} from "@Module/stream/lib/live/messaging";

export class LiveService {

  private started: boolean = false;

  private readonly log: Logger = new Logger("[🌈LIVE]");
  private readonly liveWebRtcController: LiveWebRtcController = new LiveWebRtcController();
  private readonly liveWebSocketController: LiveWebSocketController = new LiveWebSocketController("/app/live",  "/topic/live");

  private accessToken: Optional<string> = null;
  private socketUrl: Optional<string> = null;
  private sessionId: Optional<string> = null;

  public constructor() {

    this.liveWebSocketController.onSdpAnswerReceived = this.liveWebRtcController.handleSDPAnswer;
    this.liveWebSocketController.onICECandidateReceived = this.liveWebRtcController.handleAddICECandidate;
    this.liveWebSocketController.onErrorReceived = this.liveWebRtcController.handleRemoteError;
    this.liveWebSocketController.onSessionExchangeCompleted = this.onSessionExchangeCompleted;
    this.liveWebSocketController.onStatusChanged = this.handleStatusChange;

    this.liveWebRtcController.onSDPGenerationError = this.onSessionGenerationError;
    this.liveWebRtcController.onSendMessage = this.liveWebSocketController.sendMessage;
  }

  /*
   * External.
   */

  @Bind()
  public handleStatusChange(online: boolean): void {
    this.onOnlineStatusChange(online);
  }

  public onOnlineStatusChange(status: boolean): void { /* INJECT */ }

  @Bind()
  public onSessionGenerationError(error: Error): void {
    this.log.error("Session generation error:", error);
  }

  @Bind()
  public onSessionExchangeCompleted(): void {
    this.log.info("Session exchange finish confirmation received.");
  }

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

    await this.liveWebSocketController.connect(this.socketUrl, this.sessionId, this.accessToken);

    this.log.info(`Started live service.`);
  }

  @Bind()
  public async stop(): Promise<void> {

    this.log.info(`Stopping service.`);

    this.started = false;

    this.accessToken = null;
    this.socketUrl = null;
    this.sessionId = null;

    await this.liveWebRtcController.stop();
    await this.liveWebSocketController.disconnect();
  }

  @Bind()
  public async connectRTC(tracks: Array<MediaStreamTrack>): Promise<void> {
    this.log.info("Connecting WebRTC.");
    await this.liveWebRtcController.start(
      {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
        ],
        iceTransportPolicy: "all"
      },
      {
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
      },
      tracks
    );
  }

  @Bind()
  public async disconnectRTC(): Promise<void> {
    this.log.info("Disconnection WebRTC.");
    await this.liveWebRtcController.stop();
  }

  @Bind()
  public async startStream(): Promise<void> {
    this.log.info("Starting stream record.");
    await this.liveWebSocketController.sendMessage("record.start", { type: ELiveSocketMessageType.START_RECORD, body: {} });
  }

  @Bind()
  public async stopStream(): Promise<void> {
    this.log.info("Stopping stream record.");
    await this.liveWebSocketController.sendMessage("record.stop", { type: ELiveSocketMessageType.STOP_RECORD, body: {} });
  }

}
