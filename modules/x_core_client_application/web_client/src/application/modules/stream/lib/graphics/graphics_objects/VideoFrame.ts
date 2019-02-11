// Lib.
import {
  AbstractBaseFixedPositionRectangleObject,
  EObjectFixedSize, fixedObjectsGrid, fixedObjectsSizing, IAbstractSizing,
  ICanvasGraphicsSizingContext, IPoint,
  IRectSizing
} from "@Lib/graphics";
import { getUserMedia, killStream, moveTracks } from "@Lib/media";

// Data.
import { streamConfig } from "@Module/stream/data/configs/StreamConfig";

export interface IVideoFrameConfig {
  borderWidth: number;
  renderBorder: boolean;
  videoDevice: string;
  root: IPoint;
  size: EObjectFixedSize;
}

export class VideoFrame extends AbstractBaseFixedPositionRectangleObject<IVideoFrameConfig> {

  public config: IVideoFrameConfig = {
    borderWidth: 1,
    renderBorder: true,
    root: { x: 0, y: 0 },
    size: EObjectFixedSize.XS,
    videoDevice: ""
  };

  protected sizingPresets: Array<IAbstractSizing> = [
    fixedObjectsSizing[EObjectFixedSize.XS],
    fixedObjectsSizing[EObjectFixedSize.SM],
    fixedObjectsSizing[EObjectFixedSize.XL]
  ];

  private mediaStream: MediaStream = new MediaStream();
  private isVideoRendering: boolean = false;
  private hiddenVideoRenderer: HTMLVideoElement = document.createElement("video");

  public constructor() {

    super(fixedObjectsGrid[0][0], fixedObjectsSizing[EObjectFixedSize.XS]);

    this.hiddenVideoRenderer.srcObject = this.mediaStream;
    this.hiddenVideoRenderer.autoplay = true;
    this.hiddenVideoRenderer.muted = true;

    this.startVideo().then(() => this.getDefaultVideo());
  }

  public async setVideoDevice(deviceId: string): Promise<void> {
    this.config.videoDevice = deviceId;
    this.updateMediaStream(await getUserMedia(streamConfig.getMediaConstraints(deviceId as any, false)));
  }

  public renderSelf(context: CanvasRenderingContext2D): void {

    const sizing: ICanvasGraphicsSizingContext = this.getSizing();
    const absoluteRect: IRectSizing = this.getAbsoluteSizing();

    const configuration: IVideoFrameConfig = this.config;

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

  public applyConfiguration(src: VideoFrame | typeof VideoFrame.prototype.config): void {

    super.applyConfiguration(src);

    if (src instanceof VideoFrame) {
      this.updateMediaStream(src.mediaStream.clone());
    }
  }

  public dispose(): void {

    killStream(this.mediaStream);
    delete this.hiddenVideoRenderer;

    // @ts-ignore dispose item.
    this.mediaStream = null;

    super.dispose();
  }

  private updateMediaStream(stream: MediaStream): void {

    moveTracks(this.mediaStream, stream);

    const videoTracks: Array<MediaStreamTrack> = this.mediaStream.getVideoTracks();
    const oldDevice: string = this.config.videoDevice;

    this.config.videoDevice = videoTracks.length !== 0
      ? videoTracks[0].getSettings().deviceId || oldDevice
      : oldDevice;
  }

  // Internal.

  private async getDefaultVideo(): Promise<void> {
    this.updateMediaStream(await getUserMedia(streamConfig.getMediaConstraints(true, false)));
  }

  private async startVideo(): Promise<void> {

    if (this.isVideoRendering === false) {
      this.hiddenVideoRenderer.play();
      this.isVideoRendering = true;
    }
  }

}
