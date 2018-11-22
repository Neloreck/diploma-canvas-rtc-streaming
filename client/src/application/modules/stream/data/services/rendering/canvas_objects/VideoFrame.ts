import {AbstractMovableRectangleObject} from "@Lib/react_lib/canvas_video_graphics";
import {ICanvasGraphicsSizingContext} from "@Lib/react_lib/canvas_video_graphics/rendering/context";

export class VideoFrame extends AbstractMovableRectangleObject {

  public configuration = {
    backgroundColor: "#dadada",
    borderColor: "#24242b",
    borderWidth: 4,
    renderBackground: true,
    renderBorder: true,
    stream: new MediaStream()
  };

  private isVideoRendering: boolean = false;
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

    if (configuration.renderBackground) {
      context.fillStyle = configuration.backgroundColor;
      context.fillRect(this.left * pWidth, this.top * pHeight, this.width * pWidth, this.height * pHeight);
    }

    if (configuration.renderBorder) {
      context.lineWidth = configuration.borderWidth;
      context.strokeStyle = configuration.borderColor;
      context.rect(this.left * pWidth, this.top * pHeight, this.width * pWidth, this.height * pHeight);
      context.stroke();
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
