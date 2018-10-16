import {IPoint} from "../../context/index";
import {CanvasGraphicsMovableObject} from "./CanvasGraphicsMovableObject";

export abstract class CanvasGraphicsMovableCircleObject extends CanvasGraphicsMovableObject {

  public isInBounds(target: IPoint): boolean {

    const { x: centerX, y: centerY } = this.getBoundsCenter();

    return Math.sqrt(Math.pow((target.x - centerX), 2) + Math.pow((target.y - centerY), 2)) < this.getBoundsRadius();
  }

  protected onMove(moveTo: IPoint, moveFrom: IPoint): void {

    const center: IPoint = this.getBoundsCenter();
    const newPosition: IPoint = { x: 0, y: 0};

    newPosition.x = center.x + (moveTo.x - moveFrom.x);
    newPosition.y = center.y + (moveTo.y - moveFrom.y);

    this.setBoundsCenter({ x: this.asPercentageWidth(newPosition.x), y: this.asPercentageHeight(newPosition.y) });
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

  protected abstract setBoundsCenter(center: IPoint): void;

  protected abstract getBoundsCenter(): IPoint;

  protected abstract getBoundsRadius(): number;

}
