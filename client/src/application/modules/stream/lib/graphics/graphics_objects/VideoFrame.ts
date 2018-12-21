// Lib.
import {AbstractBaseRectangleObject, ICanvasGraphicsSizingContext, IRectSizing} from "@Lib/graphics";

// Data.
import {localMediaService} from "@Module/stream/data/services/local_media";

export class VideoFrame extends AbstractBaseRectangleObject<typeof VideoFrame.prototype.configuration> {

  public configuration = {
    borderWidth: 1,
    renderBorder: true,
    videoDevice: true
  };

  private mediaStream: MediaStream = new MediaStream();
  private isVideoRendering: boolean = false;
  private hiddenVideoRenderer: HTMLVideoElement = document.createElement("video");

  public constructor() {

    super();

    this.hiddenVideoRenderer.srcObject = this.mediaStream;
    this.hiddenVideoRenderer.autoplay = true;
    this.hiddenVideoRenderer.muted = true;

    this.startVideo().then(() => this.getDefaultVideo());
  }

  public async getDefaultVideo(): Promise<void> {
    const mediaStream: MediaStream = await localMediaService.getUserMedia(this.configuration.videoDevice, false);
    this.updateMediaStream(mediaStream);
  }

  public updateMediaStream(stream: MediaStream): void {
    localMediaService.moveTracks(this.mediaStream, stream);
  }

  public renderSelf(): void {

    const context: CanvasRenderingContext2D = this.getContext();
    const sizing: ICanvasGraphicsSizingContext = this.getSizing();
    const absoluteRect: IRectSizing = this.getAbsoluteSizing();

    const configuration = this.configuration;

    this.hiddenVideoRenderer.width = sizing.width;
    this.hiddenVideoRenderer.height = sizing.height;

    if (configuration.renderBorder) {
      context.beginPath();
      context.lineWidth = configuration.borderWidth;
      context.strokeStyle = "#000";
      context.rect(absoluteRect.left, absoluteRect.top, absoluteRect.width, absoluteRect.height);
      context.stroke();
      context.closePath();
    }

    if (this.hiddenVideoRenderer.srcObject && (this.hiddenVideoRenderer.srcObject as MediaStream).active) {
      context.drawImage(this.hiddenVideoRenderer, absoluteRect.left, absoluteRect.top, absoluteRect.width, absoluteRect.height);
    }
  }

  public dispose(): void {
    localMediaService.killStream(this.mediaStream);
    delete this.hiddenVideoRenderer;
    // @ts-ignore dispose item.
    this.mediaStream = null;

    super.dispose();
  }

  private async startVideo(): Promise<void> {
    if (this.isVideoRendering === false) {
      this.hiddenVideoRenderer.play();
      this.isVideoRendering = true;
    }
  }

}
