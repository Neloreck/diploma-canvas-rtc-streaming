import {IPoint} from "../types";

export class RenderUtils {

  public static renderDashedLine(context: CanvasRenderingContext2D, p1: IPoint, p2: IPoint, offset: number, color: string, width: number): void {

    context.strokeStyle = color;
    context.lineWidth = width;
    context.lineDashOffset = offset;

    context.setLineDash([25, 25]);

    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.stroke();
    context.closePath();

    context.setLineDash([0]);
    context.lineDashOffset = 0;
  }

  public static renderCircle(context: CanvasRenderingContext2D, center: IPoint, radius: number, color: string, width: number): void {

    context.strokeStyle = color;
    context.lineWidth = width;

    context.beginPath();
    context.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    context.closePath();
  }

  public static renderFilledCircle(context: CanvasRenderingContext2D, center: IPoint, radius: number, color: string, fillColor: string, width: number): void {

    context.strokeStyle = color;
    context.fillStyle = fillColor;
    context.lineWidth = width;

    context.beginPath();
    context.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    context.closePath();
  }

  public static renderRectangleBorder(context: CanvasRenderingContext2D, topLeft: IPoint, botRight: IPoint, color: string, width: number): void {

    context.strokeStyle = color;
    context.lineWidth = width;

    context.beginPath();
    context.rect(topLeft.x, topLeft.y, botRight.x - topLeft.x, botRight.y - topLeft.y);
    context.stroke();
    context.closePath();
  }

  public static renderCircleSegment(context: CanvasRenderingContext2D, center: IPoint, radius: number, startAngle: number, endAngle: number, color: string, width: number): void {

    context.strokeStyle = color;
    context.lineWidth = width;

    context.beginPath();
    context.arc(center.x, center.y, radius, startAngle, endAngle);
    context.stroke();
    context.closePath();
  }

}
