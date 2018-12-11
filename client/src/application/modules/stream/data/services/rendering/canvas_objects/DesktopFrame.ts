// Lib.
import {AbstractBaseRectangleObject, IRectSizing} from "@Lib/graphics";
import {ICanvasGraphicsSizingContext} from "@Lib/graphics";

// Data.
import {localMediaService} from "@Module/stream/data/services/local_media";

export class DesktopFrame extends AbstractBaseRectangleObject {

  private static DESKTOP_CAPTURING_CONSTRAINT = {
    video: {
      frameRate: {max: "30"},
      height: {max: "1080"},
      mediaSource: "screen", // whole screen sharing
      // mediaSource: "window", // choose a window to share
      // mediaSource: "application", // choose a window to share
      width: {max: "1920"}
    }
  };

  public configuration = {
    backgroundColor: "#dadada",
    borderColor: "#24242b",
    borderWidth: 4,
    renderBackground: true,
    renderBorder: true
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
    // todo: Frame widget there.
  }

  public renderSelf(): void {

    const context: CanvasRenderingContext2D = this.getContext();
    const sizing: ICanvasGraphicsSizingContext = this.getSizing();
    const absoluteRect: IRectSizing = this.getAbsoluteSizing();

    const configuration = this.configuration;

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
      context.fillRect(absoluteRect.left, absoluteRect.top, absoluteRect.width, absoluteRect.height);
      context.stroke();
    }

    context.drawImage(this.hiddenVideoRenderer, absoluteRect.left, absoluteRect.top, absoluteRect.width, absoluteRect.height);
    context.closePath();
  }

  private async startVideo(): Promise<void> {
    if (this.isVideoRendering === false) {
      this.hiddenVideoRenderer.play();
      this.isVideoRendering = true;
    }
  }

}
