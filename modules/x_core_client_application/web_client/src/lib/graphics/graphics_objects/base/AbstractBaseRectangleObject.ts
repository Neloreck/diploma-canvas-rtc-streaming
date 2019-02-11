import { IBoundingRect, ICanvasGraphicsSizingContext, IPoint, IRectSizing } from "../../types";
import { GeometricUtils, RelativeRenderUtils, RenderUtils } from "../../utils";
import { AbstractCanvasGraphicsResizableObject } from "./AbstractCanvasGraphicsResizableObject";

import { FixedControlButton } from "./assist/FixedControlButton";
import { ResizeHandler } from "./assist/ResizeHandler";

export abstract class AbstractBaseRectangleObject<T extends object> extends AbstractCanvasGraphicsResizableObject<T> {

  protected position: IRectSizing = {
    height: 20,
    left: 40,
    top: 40,
    width: 20
  };

  protected readonly deleteButton: FixedControlButton = new FixedControlButton(FixedControlButton.EButtonType.DELETE);
  protected readonly resizeControls: Array<ResizeHandler> = [
    new ResizeHandler(0, this), new ResizeHandler(1, this), new ResizeHandler(2, this), new ResizeHandler(3, this)
  ];

  private minWidth: number = 3;
  private minHeight: number = 5;

  public constructor();
  public constructor(left: number, top: number, width: number, height: number);
  public constructor(leftOptional?: number, topOptional?: number, widthOptional?: number, heightOptional?: number) {

    super();

    this.position = {
      height: heightOptional || this.position.height,
      left: leftOptional || this.position.left,
      top: topOptional || this.position.top,
      width: widthOptional || this.position.width
    };

  }

  /* Base context interaction. */

  public setSizing(sizing: ICanvasGraphicsSizingContext): void {

    super.setSizing(sizing);

    this.resizeControls.forEach((control: ResizeHandler): void => control.setSizing(sizing));
    this.deleteButton.setSizing(sizing);

    this.updateControlsPositions();
  }

  /* Complex checks. */

  public isInBounds(targetPoint: IPoint): boolean {
    const { topLeft, topRight, botLeft, botRight } = this.getBoundingRect();
    return GeometricUtils.checkPointInTriangle(targetPoint, botLeft, topLeft, topRight) || GeometricUtils.checkPointInTriangle(targetPoint, botLeft, botRight, topRight);
  }

  public isInDeleteBounds(targetPoint: IPoint): boolean {
    return this.deleteButton.isInBounds(targetPoint);
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

        if (this.position.height - diffY > this.minHeight) {
          this.position.top += diffY;
          this.position.height -= diffY;
        }

        this.position.width = Math.max(resizerRect.topRight.x - this.position.left, this.minWidth);
        break;

      case 1:

        diffY = resizerRect.topRight.y - bounds.topRight.y;

        if (this.position.height - diffY > this.minHeight) {
          this.position.top += diffY;
          this.position.height -= diffY;
        }

        diffX = resizerRect.topLeft.x - bounds.topLeft.x;

        if (this.position.width - diffX > this.minWidth) {
          this.position.left += diffX;
          this.position.width -= diffX;
        }

        break;

      case 2:

        diffX = resizerRect.topLeft.x - bounds.topLeft.x;

        if (this.position.width - diffX > this.minWidth) {
          this.position.left += diffX;
          this.position.width -= diffX;
        }

        this.position.height = Math.max(this.position.height + (resizerRect.botRight.y - bounds.botRight.y), this.minHeight);
        break;

      case 3:
        this.position.height = Math.max(this.position.height + (resizerRect.botRight.y - bounds.botRight.y), this.minHeight);
        this.position.width = Math.max(resizerRect.topRight.x - this.position.left, this.minWidth);
        break;

      default:
        throw new Error("Unknown corner: " + index);
    }
  }

  /* Selection and interaction rendering. */

  public renderDisabled(context: CanvasRenderingContext2D): void {

    const { widthPercent: pWidth, heightPercent: pHeight } = this.getBasePercentSizing();
    const { left, top, width, height } = this.position;

    this.renderSelf(context);

    RelativeRenderUtils.renderFilledRectangle(this.getSizing(), context,
      { x: this.position.left, y: this.position.top },
      { x: this.position.left + this.position.width, y: this.position.top + this.position.height },
      this.disabledColor, this.disabledColor, 0);

    context.strokeStyle = this.disabledColor;
    context.lineWidth = 4;

    context.beginPath();
    context.moveTo(left * pWidth, top * pHeight);
    context.lineTo((left  + width) * pWidth, (top + height) * pHeight);
    context.moveTo(left * pWidth, (top + height) * pHeight);
    context.lineTo((left  + width) * pWidth, top * pHeight);
    context.stroke();
    context.closePath();
  }

  public dispose(): void {
    super.dispose();
    this.resizeControls.forEach((control: ResizeHandler): void => control.dispose());
  }

  protected renderSelection(context: CanvasRenderingContext2D): void {

    const absoluteBoundingRect: IBoundingRect = this.getAbsoluteSizingBoundingRect();

    this.renderAnimatedDashedLine(context, absoluteBoundingRect.topLeft, absoluteBoundingRect.topRight);
    this.renderAnimatedDashedLine(context, absoluteBoundingRect.topRight, absoluteBoundingRect.botRight);
    this.renderAnimatedDashedLine(context, absoluteBoundingRect.botRight, absoluteBoundingRect.botLeft);
    this.renderAnimatedDashedLine(context, absoluteBoundingRect.botLeft, absoluteBoundingRect.topLeft);
  }

  protected renderAnimatedDashedLine(context: CanvasRenderingContext2D, p1: IPoint, p2: IPoint): void {
    RenderUtils.renderDashedLine(context,
      { x: p1.x, y: p1.y },
      { x: p2.x, y: p2.y },
      ((Date.now() - this.createdAt) % 2000) / -8,
      this.interactionColor,
      this.interactionAbsoluteSize
    );
  }

  protected renderControls(context: CanvasRenderingContext2D): void {
    this.resizeControls.forEach((control: ResizeHandler): void => control.render(context));
    this.deleteButton.renderSelf(context);
  }

  /* Moving. */

  protected onMove(moveTo: IPoint, moveFrom: IPoint): void {
    this.setRoot({ x: this.position.left + (moveTo.x - moveFrom.x), y: this.position.top + (moveTo.y - moveFrom.y) });
    this.updateControlsPositions();
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

  protected afterResize(): void {
    this.updateControlsPositions();
  }

  /*
   * Getters <-> Setters.
   */

  protected setRoot(rootPoint: IPoint): void {
    this.position.left = rootPoint.x;
    this.position.top = rootPoint.y;
  }

  protected getBoundingRect(): IBoundingRect {
    return {
      botLeft:  { x: this.position.left, y: this.position.top + this.position.height },
      botRight: { x: this.position.left + this.position.width, y: this.position.top + this.position.height },
      topLeft: { x: this.position.left , y: this.position.top },
      topRight: { x: this.position.left + this.position.width, y: this.position.top }
    };
  }

  protected getAbsoluteSizingBoundingRect(): IBoundingRect {

    const { widthPercent: pWidth, heightPercent: pHeight } = this.getBasePercentSizing();

    return {
      botLeft:  { x: (this.position.left) * pWidth, y: (this.position.top + this.position.height) * pHeight },
      botRight: { x: (this.position.left + this.position.width) * pWidth, y: (this.position.top + this.position.height) * pHeight },
      topLeft: { x: (this.position.left) * pWidth , y: (this.position.top) * pHeight },
      topRight: { x: (this.position.left + this.position.width) * pWidth, y: (this.position.top) * pHeight }
    };
  }

  protected getAbsoluteSizing(): IRectSizing {

    const { heightPercent: pHeight, widthPercent: pWidth } = this.getBasePercentSizing();

    return {
      height: this.position.height * pHeight,
      left: this.position.left * pWidth,
      top: this.position.top * pHeight,
      width: this.position.width * pWidth
    };
  }

  // For resizers.

  protected updateControlsPositions(): void {

    this.deleteButton.root = {
      x: this.position.left + this.position.width + this.deleteButton.size > 100 ? this.position.left - 1 - this.deleteButton.size : this.position.left + this.position.width + 1,
      y: this.position.top < 0 ? this.position.top + this.position.height - 1 - this.deleteButton.size : this.position.top
    };

    this.resizeControls.forEach((control: ResizeHandler): void => {

      const controlWidthSize: number = this.absoluteToPercentsWidth(control.absoluteSize);
      const controlHeightSize: number = this.absoluteToPercentsHeight(control.absoluteSize);

      switch (control.getIndex()) {

        case 0:
          control.setRoot({ x: this.position.left + this.position.width - controlWidthSize, y: this.position.top });
          break;

        case 1:
          control.setRoot({ x: this.position.left, y: this.position.top });
          break;

        case 2:
          control.setRoot({ x: this.position.left, y: this.position.top + this.position.height - controlHeightSize });
          break;

        case 3:
          control.setRoot({ x: this.position.left + this.position.width - controlWidthSize, y: this.position.top + this.position.height - controlHeightSize });
          break;
      }
    });
  }

}
