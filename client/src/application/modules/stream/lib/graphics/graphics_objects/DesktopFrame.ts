// Lib.
import {AbstractBaseRectangleObject, IRectSizing} from "@Lib/graphics";
import {ICanvasGraphicsSizingContext} from "@Lib/graphics";
import {MediaUtils} from "@Lib/media";

// Data.

export interface IDesktopFrameConfig {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  renderBackground: boolean;
  renderBorder: boolean;
  videoDevice: string;
}

export class DesktopFrame extends AbstractBaseRectangleObject<IDesktopFrameConfig> {

  public config: IDesktopFrameConfig = {
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
    // todo;
  }

  public updateMediaStream(stream: MediaStream): void {
    MediaUtils.moveTracks(this.mediaStream, stream);
  }

  public renderSelf(context: CanvasRenderingContext2D): void {

    const sizing: ICanvasGraphicsSizingContext = this.getSizing();
    const absoluteRect: IRectSizing = this.getAbsoluteSizing();
    const configuration: IDesktopFrameConfig = this.config;

    this.hiddenVideoRenderer.width = sizing.width;
    this.hiddenVideoRenderer.height = sizing.height;

    context.beginPath();

    if (configuration.renderBackground) {
      context.fillStyle = configuration.backgroundColor;
      context.fillRect(absoluteRect.left, absoluteRect.top, absoluteRect.width, absoluteRect.height);
    }

    if (configuration.renderBorder) {
      context.lineWidth = configuration.borderWidth;
      context.strokeStyle = configuration.borderColor;
      context.rect(absoluteRect.left, absoluteRect.top, absoluteRect.width, absoluteRect.height);
      context.stroke();
    }

    context.drawImage(this.hiddenVideoRenderer, absoluteRect.left, absoluteRect.top, absoluteRect.width, absoluteRect.height);
    context.closePath();
  }

  public dispose(): void {

    MediaUtils.killStream(this.mediaStream);
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
