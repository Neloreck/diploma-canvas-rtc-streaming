import {IBoundingRect, IPoint, IRectSizing} from "../../../types/index";
import {GeometricUtils, RenderUtils} from "../../../utils/index";
import {AbstractCanvasGraphicsResizableObject} from "../AbstractCanvasGraphicsResizableObject";

export class ResizeHandler extends AbstractCanvasGraphicsResizableObject<never> {

  public config: never;
  public readonly absoluteSize: number = 15;
  protected position: IRectSizing = { left: 0, top: 0, width: 0, height: 0 };

  private readonly index: number;
  private readonly owner: AbstractCanvasGraphicsResizableObject<any>;

  public constructor(index: number, owner: AbstractCanvasGraphicsResizableObject<any>) {
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

  public isInControlsBounds(checkPoint: IPoint): boolean {
    return false;
  }

  public isInDeleteBounds(checkPoint: IPoint): boolean {
    return false;
  }

  // Getters <-> Setters.

  public getIndex(): number {
    return this.index;
  }

  public setRoot(rootPoint: IPoint): void {
    this.position.left = rootPoint.x;
    this.position.top = rootPoint.y;
  }

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

  protected renderSelection(): void { return; }

  protected renderControls(): void { return; }

  // Resizing handling.

  protected onResize(resizeTo: IPoint, resizeFrom: IPoint): void { return; }

  protected renderSelf(context: CanvasRenderingContext2D): void {

    const rootPoint: IPoint = { x: this.percentsToAbsoluteWidth(this.position.left), y: this.percentsToAbsoluteHeight(this.position.top) };

    RenderUtils.renderFilledRectangle(context, rootPoint, { x: rootPoint.x + this.absoluteSize, y: rootPoint.y + this.absoluteSize }, this.interactionColor, this.interactionColor, 2);

    context.strokeStyle = "#000";
    context.lineWidth = 2;

    context.beginPath();

    context.arc(rootPoint.x + this.absoluteSize / 2, rootPoint.y + this.absoluteSize / 2, this.absoluteSize / 2, 0, Math.PI * 2);

    context.stroke();
    context.closePath();
  }

  protected getBoundingRect(): IBoundingRect {
    return {
      botLeft:  { x: this.position.left, y: this.position.top + this.absoluteToPercentsHeight(this.absoluteSize) },
      botRight: { x: this.position.left + this.absoluteToPercentsWidth(this.absoluteSize), y: this.position.top + this.absoluteToPercentsHeight(this.absoluteSize) },
      topLeft: { x: this.position.left , y: this.position.top },
      topRight: { x: this.position.left + this.absoluteToPercentsWidth(this.absoluteSize), y: this.position.top }
    };
  }

}
