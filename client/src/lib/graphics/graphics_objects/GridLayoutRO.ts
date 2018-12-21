import {ICanvasGraphicsSizingContext} from "../types";
import {RenderUtils} from "../utils";
import {AbstractCanvasGraphicsRenderObject} from "./base/AbstractCanvasGraphicsRenderObject";

export class GridLayoutRO extends AbstractCanvasGraphicsRenderObject<never> {

  public position: never;
  public configuration: never;

  private readonly lineWidth: number = 6;
  private readonly lineColor: string = "rgba(25, 10, 255, 0.3)";

  private readonly verticalLinesCount: number = 1;
  private readonly horizontalLinesCount: number = 1;

  public constructor(verticalLinesCount?: number, horizontalLinesCount?: number) {

    super();

    this.verticalLinesCount = verticalLinesCount || this.verticalLinesCount;
    this.horizontalLinesCount = horizontalLinesCount || this.horizontalLinesCount;

  }

  public renderSelf(context: CanvasRenderingContext2D): void {

    const {width, height}: ICanvasGraphicsSizingContext = this.getSizing();

    // Horizontal.
    for (let it = this.lineWidth / 2; it <= width + this.lineWidth; it += Math.floor(width / (this.verticalLinesCount + 1))) {
      const xPos: number = it > this.lineWidth ? it - this.lineWidth : it;
      RenderUtils.renderLine(context, { x: xPos, y: 0 }, { x: xPos, y: height }, this.lineColor, this.lineWidth);
    }

    // Horizontal.
    for (let it = this.lineWidth / 2; it <= height + this.lineWidth; it += Math.floor(height / (this.horizontalLinesCount + 1))) {
      const yPos: number = it > this.lineWidth ? it - this.lineWidth : it;
      RenderUtils.renderLine(context, { x: 0, y: yPos }, { x: width, y: yPos }, this.lineColor, this.lineWidth);
    }

  }

}
