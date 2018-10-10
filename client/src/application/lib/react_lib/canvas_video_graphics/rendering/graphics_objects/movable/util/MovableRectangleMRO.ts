import {IBoundingRect} from "../../../context";
import {IPoint} from "../../../context/IPoint";
import {CanvasGraphicsMovableRectangleObject} from "../../abstract/CanvasGraphicsMovableRectangleObject";
import {MovableResizeControlMRO} from "./MovableResizeControlMRO";

export class MovableRectangleMRO extends CanvasGraphicsMovableRectangleObject {

  private left: number = 0;
  private top: number = 0;
  private width: number = 5;
  private height: number = 5;

  private resizeControlsSize: number = 15;

  private readonly resizeTopLeft: MovableResizeControlMRO = new MovableResizeControlMRO(0, 0, 15, 15);
  private readonly resizeTopRight: MovableResizeControlMRO = new MovableResizeControlMRO(0, 0, 15, 15);
  private readonly resizeBotLeft: MovableResizeControlMRO = new MovableResizeControlMRO(0, 0, 15, 15);
  private readonly resizeBotRight: MovableResizeControlMRO = new MovableResizeControlMRO(0, 0, 15, 15);

  public constructor(left: number, top: number, width: number, height: number) {

    super();

    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;

    this.resizeTopLeft.setOwner(this);
    this.resizeTopRight.setOwner(this);
    this.resizeBotLeft.setOwner(this);
    this.resizeBotRight.setOwner(this);

    this.resizeTopLeft.setCorner(1);
    this.resizeTopRight.setCorner(0);
    this.resizeBotLeft.setCorner(2);
    this.resizeBotRight.setCorner(3);
  }

  public renderSelf(): void {

    this.renderElement();

    if (this.isSelected()) {
      this.renderSelectionOverElement();
      this.renderResizeControls();
    }

  }

  public isInResizeBounds(x: number, y: number): boolean {
    return this.resizeTopLeft.isInBounds(x, y) || this.resizeTopRight.isInBounds(x, y) ||
      this.resizeBotLeft.isInBounds(x, y) || this.resizeBotRight.isInBounds(x, y);
  }

  /* Change size or coordinate depending or corner: */
  public afterResize(resizeControl: MovableResizeControlMRO, corner: 0 | 1 | 2 | 3): void {

    const bounds: IBoundingRect = this.getBoundingRect();

    let diffX: number = 0;
    let diffY: number = 0;

    switch (corner) {

      case 0:

        diffY = this.asPercentageHeight(resizeControl.absoluteTop + resizeControl.absoluteHeight - bounds.topLeft.y - this.getPercentageHeight(this.height));

        this.top += diffY;
        this.height -= diffY;

        this.width += this.asPercentageWidth(resizeControl.absoluteLeft - bounds.topLeft.x);

        break;

      case 1:

        diffX = this.asPercentageWidth(resizeControl.absoluteLeft - bounds.topLeft.x);

        this.left += diffX;
        this.width -= diffX;

        diffY = this.asPercentageHeight(resizeControl.absoluteTop - bounds.topRight.y);

        this.top += diffY;
        this.height -= diffY;

        break;

      case 2:

        diffX = this.asPercentageWidth(resizeControl.absoluteLeft + resizeControl.absoluteWidth - bounds.botLeft.x - this.getPercentageWidth(this.width));

        this.left += diffX;
        this.width -= diffX;

        this.height += this.asPercentageHeight(resizeControl.absoluteTop - bounds.topRight.y);

        break;

      case 3:
        this.width += this.asPercentageWidth(resizeControl.absoluteLeft + resizeControl.absoluteWidth - bounds.botLeft.x - this.getPercentageWidth(this.width));
        this.height += this.asPercentageHeight(resizeControl.absoluteTop + resizeControl.absoluteHeight - bounds.topLeft.y - this.getPercentageHeight(this.height));
        break;

      default:
        throw new Error("Unknown corner: " + corner);

    }

  }

  protected onResize(resizeTo: IPoint, resizeFrom: IPoint): void {

    const boundingRect: IBoundingRect = this.getBoundingRect();

    const halfWidth: number = (boundingRect.topRight.x - boundingRect.topLeft.x) / 2;
    const halfHeight: number = (boundingRect.botLeft.y - boundingRect.topLeft.y) / 2;

    const center: IPoint = {
      x: (boundingRect.topRight.x - halfWidth),
      y: (boundingRect.botRight.y - halfHeight)
    };

    if (resizeTo.x > center.x && resizeTo.y < center.y) {
      this.resizeTopRight.move(resizeTo, resizeFrom);
    } else if (resizeTo.x < center.x && resizeTo.y < center.y) {
      this.resizeTopLeft.move(resizeTo, resizeFrom);
    } else if (resizeTo.x < center.x && resizeTo.y > center.y) {
      this.resizeBotLeft.move(resizeTo, resizeFrom);
    } else {
      this.resizeBotRight.move(resizeTo, resizeFrom);
    }

  }

  protected setRoot(x: number, y: number): void {
    this.left = x * 100 / this.getPercentageWidth(100);
    this.top = y * 100 / this.getPercentageHeight(100);
  }

  protected getBoundingRect(): IBoundingRect {

    const { width: pWidth, height: pHeight } = this.getPercentageBaseSizing();

    const topLeft: IPoint = { x: this.left * pWidth , y: this.top * pHeight };
    const topRight: IPoint = { x: this.left * pWidth + this.width * pWidth, y: this.top * pHeight };
    const botRight: IPoint = { x: this.left * pWidth + this.width * pWidth, y: this.top * pHeight + this.height * pHeight };
    const botLeft: IPoint = { x: this.left * pWidth , y: this.top * pHeight + this.height * pHeight };

    return { topLeft, topRight, botLeft, botRight};
  }

  private renderElement(): void {

    const context: CanvasRenderingContext2D = this.getContext();
    const { width: pWidth, height: pHeight } = this.getPercentageBaseSizing();

    context.strokeStyle = "#ff6664";
    context.lineWidth = 3;

    context.beginPath();
    context.rect(this.left * pWidth, this.top * pHeight, this.width * pWidth, this.height * pHeight);
    context.stroke();
    context.closePath();
  }

  private renderResizeControls(): void {

    const { width: pWidth, height: pHeight } = this.getPercentageBaseSizing();

    const resizeSize: number = this.resizeControlsSize;

    const realHeight: number = this.height * pHeight;
    const realWidth: number = this.width * pWidth;

    this.resizeTopLeft.setContext(this.getContext());
    this.resizeTopRight.setContext(this.getContext());
    this.resizeBotLeft.setContext(this.getContext());
    this.resizeBotRight.setContext(this.getContext());

    this.resizeTopLeft.setSizing(this.getSizing());
    this.resizeTopRight.setSizing(this.getSizing());
    this.resizeBotLeft.setSizing(this.getSizing());
    this.resizeBotRight.setSizing(this.getSizing());

    this.resizeTopLeft.updateAbsoluteSizing(this.left * pWidth, this.top * pHeight, resizeSize, resizeSize);
    this.resizeTopRight.updateAbsoluteSizing(this.left * pWidth, this.top * pHeight + realHeight - resizeSize, resizeSize, resizeSize);
    this.resizeBotLeft.updateAbsoluteSizing(this.left * pWidth + realWidth - resizeSize, this.top * pHeight, resizeSize, resizeSize);
    this.resizeBotRight.updateAbsoluteSizing(this.left * pWidth + realWidth - resizeSize, this.top * pHeight + realHeight - resizeSize, resizeSize, resizeSize);

    this.resizeTopLeft.renderSelf();
    this.resizeTopRight.renderSelf();
    this.resizeBotLeft.renderSelf();
    this.resizeBotRight.renderSelf();
  }

}
