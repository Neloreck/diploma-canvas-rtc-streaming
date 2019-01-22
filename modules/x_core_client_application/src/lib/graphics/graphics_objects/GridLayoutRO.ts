import {IPoint} from "@Lib/graphics";
import {ICanvasGraphicsSizingContext} from "../types";
import {RenderUtils} from "../utils";
import {AbstractCanvasGraphicsRenderObject} from "./base/AbstractCanvasGraphicsRenderObject";
import {
  BASE_GRID_LEVELS,
} from "./utils/fixedObjectPosition";
import {fixedObjectsGrid} from "./utils/fixedObjectPosition";

export class GridLayoutRO extends AbstractCanvasGraphicsRenderObject<never> {

  public position: never;
  public config: never;

  private readonly lineWidth: number = 2;
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
    for (let it: number = this.lineWidth / 2; it <= width + this.lineWidth; it += Math.floor(width / (this.verticalLinesCount + 1))) {
      const xPos: number = it > this.lineWidth ? it - this.lineWidth : it;
      RenderUtils.renderLine(context, { x: xPos, y: 0 }, { x: xPos, y: height }, this.lineColor, this.lineWidth);
    }

    // Horizontal.
    for (let it: number = this.lineWidth / 2; it <= height + this.lineWidth; it += Math.floor(height / (this.horizontalLinesCount + 1))) {
      const yPos: number = it > this.lineWidth ? it - this.lineWidth : it;
      RenderUtils.renderLine(context, { x: 0, y: yPos }, { x: width, y: yPos }, this.lineColor, this.lineWidth);
    }

    this.renderPlaceholders(context);
  }

  private renderPlaceholders(context: CanvasRenderingContext2D): void {

    const { heightPercent: pHeight, widthPercent: pWidth} = this.getBasePercentSizing();

    context.strokeStyle = "red";

    for (let it: number = 0; it < BASE_GRID_LEVELS; it ++) {

      for (let jt: number = 0; jt < BASE_GRID_LEVELS; jt ++) {

        const center: IPoint = fixedObjectsGrid[it][jt];

        context.beginPath();
        context.arc(center.x * pWidth, center.y * pHeight, 5, 0, Math.PI * 2);
        context.stroke();
        context.closePath();
      }
    }

  }

}
