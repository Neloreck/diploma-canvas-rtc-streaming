import {IBoundingRect, ICanvasGraphicsSizingContext, IPoint} from "../../types";
import {GeometricUtils} from "../../utils/GeometricUtils";
import {RenderUtils} from "../../utils/RenderUtils";
import {AbstractCanvasGraphicsResizableObject} from "./AbstractCanvasGraphicsResizableObject";
import {ResizeHandler} from "./ResizeHandler";

export abstract class AbstractBaseRectangleObject extends AbstractCanvasGraphicsResizableObject {

  public rectSize = {
    height: 20,
    left: 40,
    top: 40,
    width: 20
  };

  protected readonly resizeControls: Array<ResizeHandler> = [
    new ResizeHandler(0, this), new ResizeHandler(1, this), new ResizeHandler(2, this), new ResizeHandler(3, this)
  ];

  public constructor();
  public constructor(left: number, top: number, width: number, height: number);
  public constructor(leftOptional?: number, topOptional?: number, widthOptional?: number, heightOptional?: number) {

    super();

    this.rectSize = {
      height: heightOptional || this.rectSize.height,
      left: leftOptional || this.rectSize.left,
      top: topOptional || this.rectSize.top,
      width: widthOptional || this.rectSize.width
    };

  }

  /* Base context interaction. */

  public setContext(context: CanvasRenderingContext2D): void {
    this.resizeControls.forEach((control: ResizeHandler): void => control.setContext(context));
    super.setContext(context);
  }

  public setSizing(sizing: ICanvasGraphicsSizingContext): void {
    this.resizeControls.forEach((control: ResizeHandler): void => control.setSizing(sizing));
    super.setSizing(sizing);

    this.updateResizersPositions();
  }

  /* Complex checks. */

  public isInBounds(targetPoint: IPoint): boolean {
    const {topLeft, topRight, botLeft, botRight} = this.getBoundingRect();
    return GeometricUtils.checkPointInTriangle(targetPoint, botLeft, topLeft, topRight) || GeometricUtils.checkPointInTriangle(targetPoint, botLeft, botRight, topRight);
  }

  public isInResizeBounds(target: IPoint): boolean {
    return this.resizeControls.some((control: ResizeHandler): boolean => control.isInBounds(target));
  }

  /* External resize component moved: */

  public afterResizeControlMoved(resizerRect: IBoundingRect, index: 0 | 1 | 2 | 3): void {

    const bounds: IBoundingRect = this.getBoundingRect();

    let diffX: number = 0;
    let diffY: number = 0;

    switch (index) {

      case 0:

        diffY = resizerRect.topRight.y - bounds.topRight.y;
        this.rectSize.top += diffY;
        this.rectSize.height -= diffY;
        this.rectSize.width = resizerRect.topRight.x - this.rectSize.left;
        break;

      case 1:

        diffY = resizerRect.topRight.y - bounds.topRight.y;
        this.rectSize.top += diffY;
        this.rectSize.height -= diffY;

        diffX = resizerRect.topLeft.x - bounds.topLeft.x;
        this.rectSize.left += diffX;
        this.rectSize.width -= diffX;

        break;

      case 2:

        diffX = resizerRect.topLeft.x - bounds.topLeft.x;
        this.rectSize.left += diffX;
        this.rectSize.width -= diffX;

        this.rectSize.height = this.rectSize.height + (resizerRect.botRight.y - bounds.botRight.y);
        break;

      case 3:
        this.rectSize.height = this.rectSize.height + (resizerRect.botRight.y - bounds.botRight.y);
        this.rectSize.width = resizerRect.topRight.x - this.rectSize.left;
        break;

      default:
        throw new Error("Unknown corner: " + index);

    }
  }

  /* Selection and interaction rendering. */

  public renderInteraction(): void {
    this.renderSelectionOverElement();
    this.renderResizeControls();
  }

  protected renderSelectionOverElement(): void {

    const absoluteBoundingRect: IBoundingRect = this.getAbsoluteSizingBoundingRect();
    const context: CanvasRenderingContext2D = this.getContext();

    /* Default interaction context config: */
    context.strokeStyle = "#5dff71";
    context.fillStyle = "#5dff71";
    context.lineWidth = 3;

    RenderUtils.renderCircle(
      context,
      {
      x: (absoluteBoundingRect.topRight.x - (absoluteBoundingRect.topRight.x - absoluteBoundingRect.topLeft.x) / 2),
      y: (absoluteBoundingRect.botRight.y - (absoluteBoundingRect.botLeft.y - absoluteBoundingRect.topLeft.y) / 2)
    },
      2);

    const renderAnimatedDashedLine = (p1: IPoint, p2: IPoint): void =>
      RenderUtils.renderDashedLine(context, { x: p1.x, y: p1.y }, { x: p2.x, y: p2.y }, ((Date.now() - this.createdAt) % 2000) / -8);

    renderAnimatedDashedLine(absoluteBoundingRect.topLeft, absoluteBoundingRect.topRight);
    renderAnimatedDashedLine(absoluteBoundingRect.topRight, absoluteBoundingRect.botRight);
    renderAnimatedDashedLine(absoluteBoundingRect.botRight, absoluteBoundingRect.botLeft);
    renderAnimatedDashedLine(absoluteBoundingRect.botLeft, absoluteBoundingRect.topLeft);
  }

  protected renderResizeControls(): void {
    this.resizeControls.forEach((control: ResizeHandler): void => control.render());
  }

  /* Moving. */

  protected onMove(moveTo: IPoint, moveFrom: IPoint): void {
    this.setRoot({ x: this.rectSize.left + (moveTo.x - moveFrom.x), y: this.rectSize.top + (moveTo.y - moveFrom.y) });
    this.updateResizersPositions();
  }

  /* Resizing. */

  protected onResize(resizeTo: IPoint, resizeFrom: IPoint): void {

    const boundingRect: IBoundingRect = this.getBoundingRect();

    const halfWidth: number = (boundingRect.topRight.x - boundingRect.topLeft.x) / 2;
    const halfHeight: number = (boundingRect.botLeft.y - boundingRect.topLeft.y) / 2;

    const center: IPoint = {
      x: (boundingRect.topRight.x - halfWidth),
      y: (boundingRect.botRight.y - halfHeight)
    };

    if (resizeTo.x > center.x && resizeTo.y < center.y) {
      this.resizeControls[0].move(resizeTo, resizeFrom);
    } else if (resizeTo.x < center.x && resizeTo.y < center.y) {
      this.resizeControls[1].move(resizeTo, resizeFrom);
    } else if (resizeTo.x < center.x && resizeTo.y > center.y) {
      this.resizeControls[2].move(resizeTo, resizeFrom);
    } else {
      this.resizeControls[3].move(resizeTo, resizeFrom);
    }
  }

  /*
   * Getters <-> Setters.
   */

  protected setRoot(rootPoint: IPoint): void {
    this.rectSize.left = rootPoint.x;
    this.rectSize.top = rootPoint.y;
  }

  protected getBoundingRect(): IBoundingRect {
    return {
      botLeft:  { x: this.rectSize.left, y: this.rectSize.top + this.rectSize.height },
      botRight: { x: this.rectSize.left + this.rectSize.width, y: this.rectSize.top + this.rectSize.height },
      topLeft: { x: this.rectSize.left , y: this.rectSize.top },
      topRight: { x: this.rectSize.left + this.rectSize.width, y: this.rectSize.top }
    };
  }

  protected getAbsoluteSizingBoundingRect(): IBoundingRect {

    const {widthPercent: pWidth, heightPercent: pHeight} = this.getBasePercentSizing();

    return {
      botLeft:  { x: (this.rectSize.left) * pWidth, y: (this.rectSize.top + this.rectSize.height) * pHeight },
      botRight: { x: (this.rectSize.left + this.rectSize.width) * pWidth, y: (this.rectSize.top + this.rectSize.height) * pHeight },
      topLeft: { x: (this.rectSize.left) * pWidth , y: (this.rectSize.top) * pHeight },
      topRight: { x: (this.rectSize.left + this.rectSize.width) * pWidth, y: (this.rectSize.top) * pHeight }
    };
  }

  // For resizers.

  private updateResizersPositions(): void {

    this.resizeControls.forEach((control: ResizeHandler): void => {

      const controlWidthSize: number = this.absoluteToPercentsWidth(control.absoluteSize);
      const controlHeightSize: number = this.absoluteToPercentsHeight(control.absoluteSize);

      switch (control.getIndex()) {

        case 0:
          control.setRoot({ x: this.rectSize.left + this.rectSize.width - controlWidthSize, y: this.rectSize.top});
          break;

        case 1:
          control.setRoot({ x: this.rectSize.left, y: this.rectSize.top});
          break;

        case 2:
          control.setRoot({ x: this.rectSize.left, y: this.rectSize.top + this.rectSize.height - controlHeightSize });
          break;

        case 3:
          control.setRoot({ x: this.rectSize.left + this.rectSize.width - controlWidthSize, y: this.rectSize.top + this.rectSize.height - controlHeightSize });
          break;
      }
    });
  }

}
