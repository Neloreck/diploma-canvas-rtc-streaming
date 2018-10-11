import {ICanvasGraphicsSizingContext} from "../../../context/ICanvasGraphicsSizingContext";

import {CanvasGraphicsRenderObject} from "../../abstract/CanvasGraphicsRenderObject";

export class DomVideoRO extends CanvasGraphicsRenderObject {

  private isVideoRendering: boolean = false;
  private mediaStream: MediaStream = new MediaStream();
  private hiddenVideoRenderer: HTMLVideoElement = document.createElement("video");

  public constructor(mediaStream: MediaStream) {

    super();

    this.mediaStream = mediaStream;
    this.hiddenVideoRenderer.srcObject = mediaStream;

    this.startVideo()
      .then();

  }

  public renderSelf(): void {
    const context: CanvasRenderingContext2D = this.getContext();
    const sizing: ICanvasGraphicsSizingContext = this.getSizing();

    this.hiddenVideoRenderer.width = sizing.width;
    this.hiddenVideoRenderer.height = sizing.height;

    context.drawImage(this.hiddenVideoRenderer, 0, 0, sizing.width, sizing.height);
  }

  private async startVideo(): Promise<void> {

    if (this.isVideoRendering === false) {
      await this.hiddenVideoRenderer.play();
      this.isVideoRendering = true;
    }
  }

}
