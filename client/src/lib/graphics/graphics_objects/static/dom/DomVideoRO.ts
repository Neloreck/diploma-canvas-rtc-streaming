import {ICanvasGraphicsSizingContext} from "../../../types";
import {RenderUtils} from "../../../utils";
import {AbstractCanvasGraphicsRenderObject} from "../../base/AbstractCanvasGraphicsRenderObject";

export class DomVideoRO extends AbstractCanvasGraphicsRenderObject {

  private static spinnerOffset: number = 0;
  public configuration: never;

  private readonly mediaStream: MediaStream | null;
  private readonly hiddenVideoRenderer: HTMLVideoElement = document.createElement("video");

  private isVideoRendering: boolean = false;

  public constructor(mediaStream: MediaStream | null) {

    super();

    this.mediaStream = mediaStream;

    this.hiddenVideoRenderer.muted = true;
    this.hiddenVideoRenderer.autoplay = true;
    this.hiddenVideoRenderer.srcObject = mediaStream;

    this.startVideo()
      .then();

  }

  public renderSelf(context: CanvasRenderingContext2D): void {

    const sizing: ICanvasGraphicsSizingContext = this.getSizing();

    this.hiddenVideoRenderer.width = sizing.width;
    this.hiddenVideoRenderer.height = sizing.height;

    if (this.isVideoRendering) {
      context.drawImage(this.hiddenVideoRenderer, 0, 0, sizing.width, sizing.height);
    } else {

      // Cleanup context.
      context.fillStyle = "#fff";
      context.fillRect(0, 0, sizing.width, sizing.height);

      this.renderSpinner(context);
    }
  }

  private renderSpinner(context: CanvasRenderingContext2D): void {

    const {widthPercent: pWidth, heightPercent: pHeight} = this.getBasePercentSizing();
    const spinnersCount: number = 5;

    for (let it = 0; it < spinnersCount; it ++) {

      const elementOffset: number = DomVideoRO.spinnerOffset + (2 / spinnersCount) * it;
      const nextElementOffset: number = DomVideoRO.spinnerOffset + (2 / spinnersCount) * (it + 1 );

      this.renderSpinningCircle(context, 20 + it + (elementOffset < 0.25 || elementOffset > 1.5 ? 5 : 0), elementOffset, "#6c9a6d");
      RenderUtils.renderLine(context, { x: pWidth * 50 + (Math.cos(elementOffset * Math.PI) * 20 * pWidth), y: pHeight * 50 + (Math.sin(elementOffset * Math.PI) * 10 * pHeight) },
        { x: pWidth * 50 + (Math.cos(nextElementOffset * Math.PI) * 20 * pWidth), y: pHeight * 50 + (Math.sin(nextElementOffset * Math.PI) * 10 * pHeight)}, "#6c9a6d", 3);
    }

    DomVideoRO.spinnerOffset >= 2 ? DomVideoRO.spinnerOffset = 0 : DomVideoRO.spinnerOffset += 0.007;
  }

  private renderSpinningCircle(context: CanvasRenderingContext2D, size: number, offset: number, color: string): void {

    const {widthPercent: pWidth, heightPercent: pHeight} = this.getBasePercentSizing();

    context.fillStyle = color;

    context.beginPath();
    context.arc(pWidth * 50 + (Math.cos(offset * Math.PI) * 20 * pWidth), pHeight * 50 + (Math.sin(offset * Math.PI) * 10 * pHeight), size , 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
  }

  private async startVideo(): Promise<void> {

    if (this.isVideoRendering === false) {
      await this.hiddenVideoRenderer.play();
      this.isVideoRendering = true;
    }
  }

}
