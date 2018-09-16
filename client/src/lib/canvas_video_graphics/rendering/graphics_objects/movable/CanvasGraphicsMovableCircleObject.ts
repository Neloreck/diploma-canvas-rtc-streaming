import {ICanvasGraphicsSizingContext, IPoint} from "./../../context";
import {CanvasGraphicsMovableObject} from "./CanvasGraphicsMovableObject";

export abstract class CanvasGraphicsMovableCircleObject extends CanvasGraphicsMovableObject {

  public isInBounds(x: number, y: number): boolean {

    const {x: centerX, y: centerY} = this.getBoundsCenter();

    return Math.sqrt(Math.pow((x - centerX), 2) + Math.pow((y - centerY), 2)) < this.getBoundsRadius();
  }

  protected onMove(x: number, y: number): void {

    const sizing: ICanvasGraphicsSizingContext = this.getSizing();
    const center = { x: x * 100 / sizing.width, y: y * 100 / sizing.height };

    this.setBoundsCenter(center.x, center.y);
  }

  protected renderSelectionOverElement(): void {

    const context: CanvasRenderingContext2D = this.getContext();
    const center: IPoint = this.getBoundsCenter();
    const radius: number = this.getBoundsRadius() * 100 / this.getPercentageWidth(100);

    const {width: pWidth}: { width: number } = this.getPercentageBaseSizing();

    const piOffset: number = (Date.now() - this.createdAt) / 2000 * Math.PI;

    const segmentCount: number = 8;
    const segmentLengthOffset: number = 0.1 * Math.PI;

    context.strokeStyle = "#5dff71";
    context.lineWidth = 3;

    context.beginPath();
    context.arc(center.x, center.y, pWidth * 0.25, 0, 2 * Math.PI);
    context.stroke();
    context.closePath();

    for (let it: number = 0; it < segmentCount; it ++) {

      const offset = Math.PI * 2 / segmentCount * it;

      context.beginPath();
      context.arc(center.x, center.y, radius * pWidth + this.selectionPadding,
        offset + piOffset, offset + segmentLengthOffset + piOffset);
      context.stroke();
      context.closePath();

    }

  }

  protected abstract setBoundsCenter(x: number, y: number): void;

  protected abstract getBoundsCenter(): IPoint;

  protected abstract getBoundsRadius(): number;

}
