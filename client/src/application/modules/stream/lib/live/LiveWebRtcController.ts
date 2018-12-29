import {Bind} from "@redux-cbd/utils";

// Lib.
import {Optional} from "@Lib/ts/types";
import {Logger} from "@Lib/utils";

export class LiveWebRtcController {

  private webRtcPeer: Optional<RTCPeerConnection> = null;
  private readonly log: Logger = new Logger("[🌈LIVE-RTC]");

  public async start(options?: RTCConfiguration, offerOptions?: RTCOfferOptions): Promise<void> {

    this.log.info("Starting RTC connection.");
    this.webRtcPeer = new RTCPeerConnection(options);

    try {
      const offer: RTCSessionDescriptionInit = await this.webRtcPeer.createOffer(offerOptions);

      if (!offer.sdp) {
        throw new Error("Failed to generate SDP offer, got undefined.");
      }

      this.onSDPOfferGenerated(offer);
    } catch (error) {
      this.onSDPGenerationError(error);
    }
  }

  public async stop(): Promise<void> {
    delete this.webRtcPeer;
    this.webRtcPeer = null;
  }

  /*
   * Injectable handlers.
   */

  @Bind()
  public onSDPOfferGenerated(offer: RTCSessionDescriptionInit): void {
    throw new Error("Handler for 'onSDPOfferGenerated' should be injected.");
  }

  @Bind()
  public onSDPGenerationError(error: Error): void {
    throw new Error("Handler for 'onSDPGenerationError' should be injected.");
  }

  @Bind()
  public onICECandidate(candidate: string): void {
    console.error("ON ICE CANDIDATE", candidate);
  }

  // From remote.

  @Bind()
  public handleSDPAnswer(sdp: string): void {
    this.log.info("HANDLE SDP ANSWER:", sdp);
  }

  @Bind()
  public handleAddICECandidate(ice: string): void {
    // todo;
  }

  @Bind()
  public handleRemoteError(error: any): void {
    // todo;
  }

}
