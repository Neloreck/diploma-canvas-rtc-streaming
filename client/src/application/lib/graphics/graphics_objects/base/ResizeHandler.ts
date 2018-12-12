import {IBoundingRect, IPoint} from "../../types";
import {GeometricUtils, RenderUtils} from "../../utils";
import {AbstractCanvasGraphicsResizableObject} from "./AbstractCanvasGraphicsResizableObject";

export class ResizeHandler extends AbstractCanvasGraphicsResizableObject {

  public configuration: never;
  public rectRoot = { left: 0, top: 0 };
  public absoluteSize: number = 15;

  private readonly index: number;
  private readonly owner: AbstractCanvasGraphicsResizableObject;

  public constructor(index: number, owner: AbstractCanvasGraphicsResizableObject) {
    super();

    this.index = index;
    this.owner = owner;
  }

  // Bounds check.

  public isInBounds(targetPoint: IPoint): boolean {

    const {topLeft, topRight, botLeft, botRight} = this.getBoundingRect();

    return GeometricUtils.checkPointInTriangle(targetPoint, botLeft, topLeft, topRight) || GeometricUtils.checkPointInTriangle(targetPoint, botLeft, botRight, topRight);
  }

  public isInResizeBounds(checkPoint: IPoint): boolean {
    return false;
  }

  // Getters <-> Setters.

  public getIndex(): number {
    return this.index;
  }

  public setRoot(rootPoint: IPoint): void {
    this.rectRoot.left = rootPoint.x;
    this.rectRoot.top = rootPoint.y;
  }

  public renderInteraction(): void { return; }

  public dispose(): void {
    super.dispose();
    // @ts-ignore for dispose, remove circular ref.
    this.owner = null;
  }

  // Moving handling.

  protected onMove(moveTo: IPoint, moveFrom: IPoint): void {
    this.setRoot({
      x: moveTo.x -  this.absoluteToPercentsWidth(this.absoluteSize) / 2,
      y: moveTo.y - this.absoluteToPercentsHeight(this.absoluteSize) / 2
    });
  }

  protected afterMove(): void {
    this.owner.afterResizeControlMoved(this.getBoundingRect(), this.index);
  }

  // Resizing handling.

  protected onResize(resizeTo: IPoint, resizeFrom: IPoint): void { return; }

  protected renderSelf(context: CanvasRenderingContext2D): void {
    const rootPoint: IPoint = { x: this.percentsToAbsoluteWidth(this.rectRoot.left), y: this.percentsToAbsoluteHeight(this.rectRoot.top) };
    RenderUtils.renderRectangleBorder(context, rootPoint, { x: rootPoint.x + this.absoluteSize, y: rootPoint.y + this.absoluteSize }, "#5dff71", 2);
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
