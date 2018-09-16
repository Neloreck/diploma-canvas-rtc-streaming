import {ICanvasGraphicsSizingContext} from "../../../context/ICanvasGraphicsSizingContext";

import {CanvasGraphicsRenderObject} from "../../CanvasGraphicsRenderObject";
import {CenteredTextRO} from "../text/CenteredTextRO";

export class DomVideoRO extends CanvasGraphicsRenderObject {

  private isVideoRendering: boolean = false;
  private mediaStream: MediaStream = new MediaStream();
  private hiddenVideoRenderer: HTMLVideoElement = document.createElement("video");

  private readonly centeredTextRenderer: CenteredTextRO  = new CenteredTextRO("No input source.", 7, "#FFF");

  public constructor(mediaStream: MediaStream) {

    super();

    this.mediaStream = mediaStream;
    this.hiddenVideoRenderer.srcObject = mediaStream;

    this.startVideo()
      .then();

  }

  public renderSelf(): void {

    if (this.mediaStream.getTracks().length > 0) {
      this.renderVideo();
    } else {
      this.renderNoVideo();
    }

  }

  private renderVideo(): void {

    const context: CanvasRenderingContext2D = this.getContext();
    const sizing: ICanvasGraphicsSizingContext = this.getSizing();

    this.hiddenVideoRenderer.width = sizing.width;
    this.hiddenVideoRenderer.height = sizing.height;

    context.drawImage(this.hiddenVideoRenderer, 0, 0, sizing.width, sizing.height);

  }

  private renderNoVideo(): void {

    this.centeredTextRenderer.setSizing(this.getSizing());
    this.centeredTextRenderer.setContext(this.getContext());
    this.centeredTextRenderer.renderSelf();

  }

  private async startVideo(): Promise<void> {

    if (this.isVideoRendering === false) {
      await this.hiddenVideoRenderer.play();
      this.isVideoRendering = true;
    }

  }

}
