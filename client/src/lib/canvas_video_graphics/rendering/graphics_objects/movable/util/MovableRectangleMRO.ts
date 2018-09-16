import {IPoint} from "../../../context/IPoint";
import {CanvasGraphicsMovableRectangleObject} from "../CanvasGraphicsMovableRectangleObject";

export class MovableRectangleMRO extends CanvasGraphicsMovableRectangleObject {

  private left: number = 0;
  private top: number = 0;

  private readonly width: number = 5;
  private readonly height: number = 5;

  public constructor(left: number, top: number, width: number, height: number) {

    super();

    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;

  }

  public renderSelf(): void {

    this.renderElement();

    if (this.isSelected()) {
      this.renderSelectionOverElement();
    }

  }

  protected setRoot(x: number, y: number): void {
    this.left = x;
    this.top = y;
  }

  protected getBoundingRect(): { topLeft: IPoint, topRight: IPoint, botLeft: IPoint, botRight: IPoint } {

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

}
