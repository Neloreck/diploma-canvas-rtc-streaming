import {ICanvasGraphicsSizingContext, IPoint} from "../types";
import {RenderUtils} from "./RenderUtils";

export class RelativeRenderUtils {

  public static getBasePercentSizing(sizingContext: ICanvasGraphicsSizingContext): ICanvasGraphicsSizingContext {
    return { width: sizingContext.width / 100, height: sizingContext.height / 100 };
  }

  public static renderDashedLine(sizing: ICanvasGraphicsSizingContext, context: CanvasRenderingContext2D, p1: IPoint, p2: IPoint, offset: number, color: string, width: number): void {
    const {width: pWidth, height: pHeight} = RelativeRenderUtils.getBasePercentSizing(sizing);
    RenderUtils.renderDashedLine(context, { x: p1.x * pWidth, y: p1.y * pHeight }, { x: p2.x * pWidth, y: p2.y * pHeight }, offset, color, width * pWidth);
  }

  public static renderCircle(sizing: ICanvasGraphicsSizingContext, context: CanvasRenderingContext2D, center: IPoint, radius: number, color: string, width: number): void {
    const {width: pWidth, height: pHeight} = RelativeRenderUtils.getBasePercentSizing(sizing);
    RenderUtils.renderCircle(context, { x: center.x * pWidth, y: center.y * pHeight}, radius * pWidth, color, width * pWidth);
  }

  public static renderFilledCircle(sizing: ICanvasGraphicsSizingContext, context: CanvasRenderingContext2D, center: IPoint, radius: number, color: string, fillColor: string, width: number): void {
    const {width: pWidth, height: pHeight} = RelativeRenderUtils.getBasePercentSizing(sizing);
    RenderUtils.renderFilledCircle(context, { x: center.x * pWidth, y: center.y * pHeight}, radius * pWidth, color, fillColor, width * pWidth);
  }

  public static renderRectangleBorder(sizing: ICanvasGraphicsSizingContext, context: CanvasRenderingContext2D, topLeft: IPoint, botRight: IPoint, color: string, width: number): void {
    const {width: pWidth, height: pHeight} = RelativeRenderUtils.getBasePercentSizing(sizing);
    RenderUtils.renderRectangleBorder(context, { x: topLeft.x * pWidth, y: topLeft.x * pHeight}, { x: botRight.x * pWidth, y: botRight.x * pHeight}, color, width);
  }

  public static renderCircleSegment(sizing: ICanvasGraphicsSizingContext, context: CanvasRenderingContext2D, center: IPoint, radius: number, startAngle: number, endAngle: number, color: string, width: number): void {
    const {width: pWidth, height: pHeight} = RelativeRenderUtils.getBasePercentSizing(sizing);
    RenderUtils.renderCircleSegment(context, { x: center.x * pWidth, y: center.y * pHeight}, radius * pWidth, startAngle, endAngle, color, width * pWidth);
  }

}
