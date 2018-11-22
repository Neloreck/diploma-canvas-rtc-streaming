import {AbstractMovableRectangleObject} from "@Lib/react_lib/canvas_video_graphics";
import {ICanvasGraphicsSizingContext} from "@Lib/react_lib/canvas_video_graphics/rendering/context";

export class VideoFrame extends AbstractMovableRectangleObject {

  public configuration = {
    backgroundColor: "#555",
    borderColor: "#0a0",
    borderWidth: 10,
    renderBackground: true,
    renderBorder: true,
    stream: null as (MediaStream | null)
  };

  private isVideoRendering: boolean = false;
  private mediaStream: MediaStream = new MediaStream();
  private hiddenVideoRenderer: HTMLVideoElement = document.createElement("video");

  public constructor() {

    super();

    this.startVideo()
      .then();

  }

  public renderSelf(): void {
    const context: CanvasRenderingContext2D = this.getContext();
    const sizing: ICanvasGraphicsSizingContext = this.getSizing();
    const {width: pWidth, height: pHeight } = this.getPercentageBaseSizing();
    const configuration = this.configuration;

    this.hiddenVideoRenderer.width = sizing.width;
    this.hiddenVideoRenderer.height = sizing.height;

    context.beginPath();

    if (configuration.renderBorder) {
      context.lineWidth = configuration.borderWidth;
      context.strokeStyle = configuration.borderColor;
      context.rect(this.left * pWidth, this.top * pHeight, this.width * pWidth, this.height * pHeight);
      context.stroke();
    }

    if (configuration.renderBackground) {
      context.fillStyle = configuration.backgroundColor;
      context.fillRect(this.left * pWidth, this.top * pHeight, this.width * pWidth, this.height * pHeight);
    }

    context.drawImage(this.hiddenVideoRenderer, this.top, this.left, sizing.width, sizing.height);
    context.closePath();
  }

  private async startVideo(): Promise<void> {

    if (this.isVideoRendering === false) {
      await this.hiddenVideoRenderer.play();
      this.isVideoRendering = true;
    }
  }

}
