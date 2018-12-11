import {IBoundingRect, IPoint} from "../../types";
import {GeometricUtils} from "../../utils/GeometricUtils";
import {AbstractCanvasGraphicsResizableObject} from "./AbstractCanvasGraphicsResizableObject";

export class ResizeHandler extends AbstractCanvasGraphicsResizableObject {

  public configuration: never;

  public rectRoot = {
    left: 48,
    top: 48,
  };

  public absoluteSize: number = 15;

  private readonly index: number;
  private readonly owner: AbstractCanvasGraphicsResizableObject;

  public constructor(index: number, owner: AbstractCanvasGraphicsResizableObject) {
    super();

    this.index = index;
    this.owner = owner;
  }

  public isInBounds(targetPoint: IPoint): boolean {
    const {topLeft, topRight, botLeft, botRight} = this.getBoundingRect();
    return GeometricUtils.checkPointInTriangle(targetPoint, botLeft, topLeft, topRight) || GeometricUtils.checkPointInTriangle(targetPoint, botLeft, botRight, topRight);
  }

  public isInResizeBounds(checkPoint: IPoint): boolean {
    return false;
  }

  public getIndex(): number {
    return this.index;
  }

  public renderInteraction(): void { return; }

  public afterMove(): void {
    this.owner.afterResizeControlMoved(this.getBoundingRect(), this.index);
  }

  public setRoot(rootPoint: IPoint): void {
    this.rectRoot.left = rootPoint.x;
    this.rectRoot.top = rootPoint.y;
  }

  protected onMove(moveTo: IPoint, moveFrom: IPoint): void {
    this.setRoot({
      x: moveTo.x -  this.absoluteToPercentsWidth(this.absoluteSize) / 2,
      y: moveTo.y - this.absoluteToPercentsHeight(this.absoluteSize) / 2
    });
  }

  protected onResize(resizeTo: IPoint, resizeFrom: IPoint): void { return; }

  protected renderSelf(): void {

    const context: CanvasRenderingContext2D = this.getContext();

    context.strokeStyle = "#5dff71";
    context.lineWidth = 2;

    context.beginPath();

    context.rect(this.percentsToAbsoluteWidth(this.rectRoot.left), this.percentsToAbsoluteHeight(this.rectRoot.top), this.absoluteSize, this.absoluteSize);
    context.stroke();
    context.closePath();
  }

  protected getBoundingRect(): IBoundingRect {
    return {
      botLeft:  { x: this.rectRoot.left, y: this.rectRoot.top + this.absoluteToPercentsHeight(this.absoluteSize) },
      botRight: { x: this.rectRoot.left + this.absoluteToPercentsWidth(this.absoluteSize), y: this.rectRoot.top + this.absoluteToPercentsHeight(this.absoluteSize) },
      topLeft: { x: this.rectRoot.left , y: this.rectRoot.top },
      topRight: { x: this.rectRoot.left + this.absoluteToPercentsWidth(this.absoluteSize), y: this.rectRoot.top }
    };
  }

}
