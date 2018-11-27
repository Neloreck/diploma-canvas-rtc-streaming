// Lib.
import {AbstractMovableRectangleObject} from "@Lib/react_lib/canvas_video_graphics";
import {ICanvasGraphicsSizingContext} from "@Lib/react_lib/canvas_video_graphics/rendering/context";

// Data.
import {localMediaService} from "@Module/stream/data/services/local_media";

export class VideoFrame extends AbstractMovableRectangleObject {

  public configuration = {
    audioDevice: "default",
    backgroundColor: "#dadada",
    borderColor: "#24242b",
    borderWidth: 4,
    renderBackground: true,
    renderBorder: true,
    videoDevice: "default"
  };

  private mediaStream: MediaStream = new MediaStream();
  private isVideoRendering: boolean = false;
  private hiddenVideoRenderer: HTMLVideoElement = document.createElement("video");

  public constructor() {

    super();

    this.hiddenVideoRenderer.srcObject = this.mediaStream;
    this.startVideo().then(() => this.getDefaultVideo());
  }

  public async getDefaultVideo(): Promise<void> {
    const mediaStream: MediaStream = await localMediaService.getUserMedia(true, false);
    this.updateMediaStream(mediaStream);
  }

  public updateMediaStream(stream: MediaStream): void {
    localMediaService.moveTracks(this.mediaStream, stream);
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

    context.drawImage(this.hiddenVideoRenderer, this.left * pWidth, this.top * pHeight, this.width * pWidth, this.height * pHeight);
    context.closePath();
  }

  private async startVideo(): Promise<void> {
    if (this.isVideoRendering === false) {
      this.hiddenVideoRenderer.play();
      this.isVideoRendering = true;
    }
  }

}
