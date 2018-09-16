import {CanvasGraphicsMovableCircleObject} from "../CanvasGraphicsMovableCircleObject";

export class MovableRingMRO extends CanvasGraphicsMovableCircleObject {

  private readonly radius: number = 150;
  private center: { x: number, y: number } = { x: 100, y: 100 };

  public constructor(radius: number, center: { x: number, y: number }) {

    super();

    this.radius = radius;
    this.center = center;

  }

  public renderSelf(): void {

    this.renderElement();

    if (this.isSelected()) {
      this.renderSelectionOverElement();
      this.renderResizeControls();
    }

  }

  protected getBoundsRadius(): number {
    return this.getPercentageWidth(this.radius);
  }

  protected setBoundsCenter(x: number, y: number): void {
    this.center.x = x;
    this.center.y = y;
  }

  protected getBoundsCenter(): { x: number, y: number } {
    return { x: this.getPercentageWidth(this.center.x), y: this.getPercentageHeight(this.center.y) };
  }

  private renderElement(): void {

    const context: CanvasRenderingContext2D = this.getContext();
    const {width: pWidth, height: pHeight}: { width: number, height: number} = this.getPercentageBaseSizing();

    context.strokeStyle = "#ff0033";
    context.lineWidth = 3;

    context.beginPath();
    context.arc(this.center.x * pWidth, this.center.y * pHeight, this.radius * pWidth, 0, 2 * Math.PI);
    context.stroke();

  }

  private renderResizeControls(): void {

    const {width: pWidth, height: pHeight} = this.getPercentageBaseSizing();

    const resizeSize: number = 7;

    const realDistance: number = this.radius * pWidth + this.selectionPadding;

    this.renderResizeControl(this.center.x * pWidth - realDistance, this.center.y * pHeight - realDistance, resizeSize, resizeSize);
    this.renderResizeControl(this.center.x * pWidth - realDistance, this.center.y * pHeight + realDistance, resizeSize, resizeSize);
    this.renderResizeControl(this.center.x * pWidth + realDistance, this.center.y * pHeight - realDistance, resizeSize, resizeSize);
    this.renderResizeControl(this.center.x * pWidth + realDistance, this.center.y * pHeight + realDistance, resizeSize, resizeSize);
  }

  private renderResizeControl(left: number, top: number, width: number, height: number): void {

    const context: CanvasRenderingContext2D = this.getContext();

    context.beginPath();
    context.rect(left, top, width, height);
    context.stroke();
    context.closePath();
  }


}
