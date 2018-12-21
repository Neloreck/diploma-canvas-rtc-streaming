// Lib.
import {AbstractBaseRectangleObject, ICanvasGraphicsSizingContext, IRectSizing} from "@Lib/graphics";

// Data.
import {localMediaService} from "@Module/stream/data/services/local_media";

export class VideoFrame extends AbstractBaseRectangleObject<typeof VideoFrame.prototype.configuration> {

  public configuration = {
    borderWidth: 1,
    renderBorder: true,
    videoDevice: ""
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

  public async setVideoDevice(deviceId: string): Promise<void> {
    this.configuration.videoDevice = deviceId;
    this.updateMediaStream(await localMediaService.getUserMedia(deviceId as any, false));
  }

  public renderSelf(context: CanvasRenderingContext2D): void {

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

  public applyConfiguration(src: VideoFrame | typeof VideoFrame.prototype.configuration): void {
    super.applyConfiguration(src);

    if (src instanceof VideoFrame) {
      this.updateMediaStream(src.mediaStream.clone());
    }
  }

  public dispose(): void {
    localMediaService.killStream(this.mediaStream);
    delete this.hiddenVideoRenderer;
    // @ts-ignore dispose item.
    this.mediaStream = null;

    super.dispose();
  }

  private updateMediaStream(stream: MediaStream): void {
    localMediaService.moveTracks(this.mediaStream, stream);

    const videoTracks: Array<MediaStreamTrack> = this.mediaStream.getVideoTracks();
    const oldDevice: string = this.configuration.videoDevice;

    this.configuration.videoDevice = videoTracks.length !== 0
      ? videoTracks[0].getSettings().deviceId || oldDevice
      : oldDevice;
  }

  // Internal.

  private async getDefaultVideo(): Promise<void> {
    this.updateMediaStream(await localMediaService.getUserMedia(true, false));
  }

  private async startVideo(): Promise<void> {

    if (this.isVideoRendering === false) {
      this.hiddenVideoRenderer.play();
      this.isVideoRendering = true;
    }
  }

}
