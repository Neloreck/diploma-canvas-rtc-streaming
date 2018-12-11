import {ICanvasGraphicsSizingContext, IPoint} from "../../types";
import {AbstractCanvasGraphicsResizableObject} from "./AbstractCanvasGraphicsResizableObject";
import {ResizeHandler} from "./ResizeHandler";

export abstract class AbstractBaseCircleObject extends AbstractCanvasGraphicsResizableObject {

  public radius: number = 10;
  public center: IPoint = { x: 50, y: 50 };

  protected resizeControl: ResizeHandler = new ResizeHandler(0, this);

  // private readonly resizeControl: ResizeControl = new ResizeControl();

  // Construct with radius and center.
  public constructor();
  public constructor(radius?: number, center?: IPoint) {
    super();

    this.radius = radius || this.radius;
    this.center = center || this.center;
  }

  // Base setters for context.

  public setContext(context: CanvasRenderingContext2D): void {
    this.resizeControl.setContext(context);
    super.setContext(context);
  }

  public setSizing(sizing: ICanvasGraphicsSizingContext): void {
    this.resizeControl.setSizing(sizing);
    super.setSizing(sizing);

    this.updateResizerPosition();
  }

  /* Complex checks. */

  public isInBounds(targetPoint: IPoint): boolean {

    const center: IPoint = this.getBoundsCenter();
    const {heightPercent: pHeight, widthPercent: pWidth } = this.getBasePercentSizing();

    // Cast to avoid scale related things.

    return (
      Math.sqrt(Math.pow((targetPoint.x - center.x) * pWidth, 2) + Math.pow((targetPoint.y - center.y) * pHeight, 2))
      <
      pWidth * this.getBoundsRadius()
    );
  }

  public isInResizeBounds(target: IPoint): boolean {

    // todo: Magic removed.
    const distance: number = Math.sqrt(Math.pow(target.x - this.percentsToAbsoluteWidth(this.center.x), 2) + Math.pow(target.y - this.percentsToAbsoluteWidth(this.center.y), 2));
    const isResizingOverBorder: boolean = (this.selected && Math.abs(this.percentsToAbsoluteWidth(this.radius) - distance) < 4);

    return (isResizingOverBorder || this.resizeControl.isInBounds(target));
  }

  public dispose(): void {
    super.dispose();
    this.resizeControl.dispose();
  }

  /* Selection and interaction rendering. */

  public renderInteraction(): void {
    this.renderSelectionOverElement();
    this.renderResizeControls();
  }

  protected renderSelectionOverElement(): void {

    const context: CanvasRenderingContext2D = this.getContext();
    const center: IPoint = this.getBoundsCenter();

    const piOffset: number = (Date.now() - this.createdAt) / 2000 * Math.PI;

    const segmentCount: number = 8;
    const segmentLengthOffset: number = 0.1 * Math.PI;

    context.strokeStyle = "#5dff71";
    context.fillStyle = "#5dff71";
    context.lineWidth = 3;

    // Point on center.
    context.beginPath();
    context.arc(this.percentsToAbsoluteWidth(center.x), this.percentsToAbsoluteHeight(center.y),  this.percentsToAbsoluteWidth(0.25), 0, 2 * Math.PI);
    context.fill();
    context.closePath();

    // Moving around selection.
    for (let it: number = 0; it < segmentCount; it ++) {

      // Offset for each item spacing.
      const offset = Math.PI * 2 / segmentCount * it;

      context.beginPath();
      context.arc(this.percentsToAbsoluteWidth(center.x), this.percentsToAbsoluteHeight(center.y), this.percentsToAbsoluteWidth(this.radius) + this.interactionSpacing,
        offset + piOffset, offset + segmentLengthOffset + piOffset);
      context.stroke();
      context.closePath();
    }
  }

  protected renderResizeControls(): void {
    this.resizeControl.render();
  }

  /* Moving. */

  protected onMove(moveTo: IPoint, moveFrom: IPoint): void {

    this.setBoundsCenter({
      x: this.center.x + (moveTo.x - moveFrom.x),
      y: this.center.y + (moveTo.y - moveFrom.y)
    });

    this.updateResizerPosition();
  }

  /* Resizing. */

  protected onResize(resizeTo: IPoint, resizeFrom: IPoint): void {

    const {heightPercent: pHeight, widthPercent: pWidth } = this.getBasePercentSizing();
    const distance: number = Math.sqrt(Math.pow(pWidth * (resizeTo.x - this.center.x), 2) + Math.pow(pHeight * (resizeTo.y - this.center.y), 2));

    this.radius = Math.max(this.absoluteToPercentsWidth(this.resizeControl.absoluteSize), this.absoluteToPercentsWidth(distance));
  }

  // Setters <-> Getters.

  protected setBoundsRadius(radius: number): void {
    this.radius = radius;
  }

  protected getBoundsRadius(): number {
    return this.radius + 0.05;
  }

  protected setBoundsCenter(targetPoint: IPoint): void {
    this.center = targetPoint;
  }

  protected getBoundsCenter(): IPoint {
    return this.center;
  }

  // For resizers.

  private updateResizerPosition(): void {
    this.resizeControl.setRoot({
      x: this.center.x - this.absoluteToPercentsWidth(this.resizeControl.absoluteSize) / 2,
      y: this.center.y - this.absoluteToPercentsHeight(this.percentsToAbsoluteWidth(this.radius))
    });
  }

}
