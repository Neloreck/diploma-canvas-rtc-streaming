import {CanvasGraphicsNoiseRenderer} from "./CanvasGraphicsNoiseRenderer";
import {CanvasGraphicsRenderObject} from "./CanvasGraphicsRenderObject";

export class CanvasGraphicsVideoRenderer extends CanvasGraphicsRenderObject {

  private static readonly ASPECT_RATIO: number = 16 / 9;

  private increment: number = 0;
  private canvasGraphicsNoiseRenderer: CanvasGraphicsNoiseRenderer = new CanvasGraphicsNoiseRenderer();

  private isVideoRendering: boolean = false;
  private mediaStream: MediaStream = new MediaStream();
  private hiddenVideoRenderer: HTMLVideoElement = document.createElement("video");

  public constructor(mediaStream: MediaStream) {
    super();

    this.mediaStream = mediaStream;
    this.hiddenVideoRenderer.srcObject = mediaStream;
  }

  public renderSelf(): void {

    this.startVideo();

    if (this.mediaStream.getTracks().length > 0) {
      this.renderVideo();
    } else {
      this.renderNoVideo();
    }
  }

  private renderVideo(): void {

    const context: CanvasRenderingContext2D = this.getContext();

    this.hiddenVideoRenderer.width = this.getPercentagedWidth(100);
    this.hiddenVideoRenderer.height = this.getPercentagedWidth(100) * CanvasGraphicsVideoRenderer.ASPECT_RATIO;

    context.drawImage(this.hiddenVideoRenderer, 0, 0, this.getPercentagedWidth(100), this.getPercentagedHeight(100));
  }

  private renderNoVideo(): void {
    this.renderNoise();
    this.renderTextLabel();
  }

  private renderNoise(): void {
    this.canvasGraphicsNoiseRenderer.setContext(this.getContext());
    this.canvasGraphicsNoiseRenderer.setSizing(this.getSizing());
    this.canvasGraphicsNoiseRenderer.renderSelf();
  }

  private renderTextLabel(): void {
    let text: string = "No input source provided.";

    const textSize: number = this.getPercentagedWidth(4);
    const textWidth: number = text.length * textSize / 2.2;

    const context: CanvasRenderingContext2D = this.getContext();

    context.strokeStyle = "#FF0000";
    context.fillStyle = "#FFF";
    context.font = `${textSize}px Comic Sans MS`;

    if (this.increment > 40 && this.increment < 80) {
      text += ".";
    } else if (this.increment >= 80) {
      text += "..";
    }

    this.increment ++;
    this.increment = this.increment % 120;

    context.fillText(text, Math.floor(this.getPercentagedWidth(50) - textWidth / 2),
      Math.floor(this.getPercentagedHeight(50)));
  }

  private async startVideo(): Promise<void> {
    if (this.isVideoRendering === false) {
      await this.hiddenVideoRenderer.play();
      this.isVideoRendering = true;
    }
  }

}
