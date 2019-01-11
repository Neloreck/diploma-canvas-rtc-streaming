import {ICanvasGraphicsSizingContext, IRectSizing} from "../types";
import {RelativeRenderUtils, RenderUtils} from "../utils";
import {AbstractCanvasGraphicsRenderObject} from "./base/AbstractCanvasGraphicsRenderObject";
import {
  EObjectFixedPosition,
  EObjectFixedPositionLG,
  EObjectFixedPositionMD,
  EObjectFixedPositionSM
} from "./utils/EObjectFixedPosition";

export class GridLayoutRO extends AbstractCanvasGraphicsRenderObject<never> {

  public position: never;
  public configuration: never;

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
    for (let it = this.lineWidth / 2; it <= width + this.lineWidth; it += Math.floor(width / (this.verticalLinesCount + 1))) {
      const xPos: number = it > this.lineWidth ? it - this.lineWidth : it;
      RenderUtils.renderLine(context, { x: xPos, y: 0 }, { x: xPos, y: height }, this.lineColor, this.lineWidth);
    }

    // Horizontal.
    for (let it = this.lineWidth / 2; it <= height + this.lineWidth; it += Math.floor(height / (this.horizontalLinesCount + 1))) {
      const yPos: number = it > this.lineWidth ? it - this.lineWidth : it;
      RenderUtils.renderLine(context, { x: 0, y: yPos }, { x: width, y: yPos }, this.lineColor, this.lineWidth);
    }

    this.renderPlaceholders(context);
  }

  private renderPlaceholders(context: CanvasRenderingContext2D): void {

    this.renderPlaceholdersLG(context);
    this.renderPlaceholdersMD(context);
    this.renderPlaceholdersSM(context);
  }

  private renderPlaceholdersLG(context: CanvasRenderingContext2D): void {

    const lgVerticalColor: string = "rgba(25, 60, 160, 0.95)";
    const lgHorizontalColor: string = "rgba(65, 40, 170, 0.95)";

    this.renderPlaceholder(context, EObjectFixedPositionLG.LG_TOP, lgHorizontalColor);
    this.renderPlaceholder(context, EObjectFixedPositionLG.LG_BOT, lgHorizontalColor);
    this.renderPlaceholder(context, EObjectFixedPositionLG.LG_LEFT, lgVerticalColor);
    this.renderPlaceholder(context, EObjectFixedPositionLG.LG_RIGHT, lgVerticalColor);
  }

  private renderPlaceholdersMD(context: CanvasRenderingContext2D): void {

    context.setLineDash([16, 8]);

    const mdHorizontalColor: string = "rgba(155, 35, 170, 0.5)";
    const mdVerticalColor: string = "rgba(155, 65, 155, 0.5)";

    this.renderPlaceholder(context, EObjectFixedPositionMD.MD_TOP, mdHorizontalColor);
    this.renderPlaceholder(context, EObjectFixedPositionMD.MD_BOT, mdHorizontalColor);
    this.renderPlaceholder(context, EObjectFixedPositionMD.MD_LEFT, mdVerticalColor);
    this.renderPlaceholder(context, EObjectFixedPositionMD.MD_RIGHT, mdVerticalColor);

    context.setLineDash([0]);
  }

  private renderPlaceholdersSM(context: CanvasRenderingContext2D): void {

    const smColor: string = "rgba(25, 177, 45, 0.5)";

    this.renderPlaceholder(context, EObjectFixedPositionSM.SM_TOP_LEFT, smColor);
    this.renderPlaceholder(context, EObjectFixedPositionSM.SM_TOP_RIGHT, smColor);
    this.renderPlaceholder(context, EObjectFixedPositionSM.SM_BOT_LEFT, smColor);
    this.renderPlaceholder(context, EObjectFixedPositionSM.SM_BOT_RIGHT, smColor);
  }

  private renderPlaceholder(context: CanvasRenderingContext2D, position: IRectSizing, color: string): void {
    RelativeRenderUtils.renderRectangleBorder(this.sizing, context,
      { x: position.left, y: position.top }, { x: position.left + position.width, y: position.top + position.height },
      color, this.lineWidth);
  }

}
