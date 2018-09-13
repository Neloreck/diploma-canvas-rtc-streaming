import {CanvasGraphicsRenderObject} from "./CanvasGraphicsRenderObject";

export class CanvasGraphicsVideoRenderer extends CanvasGraphicsRenderObject {

  private static readonly ASPECT_RATIO: number = 16 / 9;

  public increment: number = 0;

  private isVideoRendering: boolean = false;
  private mediaStream: MediaStream = new MediaStream();
  private hiddenVideoRenderer: HTMLVideoElement = document.createElement("video");

  public constructor(mediaStream: MediaStream) {
    super();

    this.mediaStream = mediaStream;
    this.hiddenVideoRenderer.srcObject = mediaStream;
  }

  public renderSelf(): void {
    const context: CanvasRenderingContext2D = this.getContext();

    this.startVideo();

    this.hiddenVideoRenderer.width = this.getPercentagedWidth(100);
    this.hiddenVideoRenderer.height = this.getPercentagedWidth(100) * CanvasGraphicsVideoRenderer.ASPECT_RATIO;

    if (this.mediaStream.getTracks().length) {
      context.drawImage(this.hiddenVideoRenderer, 0, 0, this.getPercentagedWidth(100), this.getPercentagedHeight(100));
    } else {
      this.renderNoVideo();
    }
  }

  private renderNoVideo(): void {
    this.renderNoise();
    this.renderTextLabel();
  }

  private renderNoise(): void {

    const context: CanvasRenderingContext2D = this.getContext();

    const skipConst: number = 25;
    const {height, width} = this.getSizing();

    for (let x = 0; x < width; x += skipConst) {
      for (let y = 0; y < height; y += skipConst) {
        const number = Math.floor(Math.random() * 100);

        context.fillStyle = "rgba(" + number + "," + number + "," + number + "," + 0.75 + ")";
        context.fillRect(x, y, skipConst, skipConst);
      }
    }
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

    context.fillText(text, this.getPercentagedWidth(50) - textWidth / 2, this.getPercentagedHeight(50));
  }

  private async startVideo(): Promise<void> {
    if (this.isVideoRendering === false) {
      await this.hiddenVideoRenderer.play();
      this.isVideoRendering = true;
    }
  }

}
