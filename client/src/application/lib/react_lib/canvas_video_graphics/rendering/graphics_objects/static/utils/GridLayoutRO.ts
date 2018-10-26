import {ICanvasGraphicsSizingContext} from "../../../context/ICanvasGraphicsSizingContext";
import {CanvasGraphicsRenderObject} from "../../base/CanvasGraphicsRenderObject";

export class GridLayoutRO extends CanvasGraphicsRenderObject {

  private readonly lineWidth: number = 3;
  private readonly verticalLinesCount: number = 1;
  private readonly horizontalLinesCount: number = 1;

  public constructor(verticalLinesCount: number = 1, horizontalLinesCount: number = 1) {

    super();

    this.verticalLinesCount = verticalLinesCount;
    this.horizontalLinesCount = horizontalLinesCount;

  }

  public renderSelf(): void {

    const context: CanvasRenderingContext2D = this.getContext();
    const {width, height}: ICanvasGraphicsSizingContext = this.getSizing();

    const endWidth: number = width - 1;
    const endHeight: number = height - 1;

    context.lineWidth = this.lineWidth;
    context.strokeStyle = "#1a09ff";

    for (let it = 1; it <= width; it += Math.floor(endWidth / (this.verticalLinesCount + 1))) {
      this.renderLine(it, 0, it, height);
    }

    for (let it = 1; it <= height; it += Math.floor(endHeight / (this.horizontalLinesCount + 1))) {
      this.renderLine(1, it, width, it);
    }
  }

  private renderLine( x1: number, y1: number, x2: number, y2: number): void {

    const context: CanvasRenderingContext2D = this.getContext();

    context.beginPath();

    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();

    context.closePath();

  }

}
