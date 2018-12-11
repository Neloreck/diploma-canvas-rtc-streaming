import {IPoint} from "../types";

export class RenderUtils {

  public static renderDashedLine(context: CanvasRenderingContext2D, p1: IPoint, p2: IPoint, offset: number): void {

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

  public static renderCircle(context: CanvasRenderingContext2D, p: IPoint, r: number): void {
    context.beginPath();
    context.arc(p.x, p.y, r, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
  }

}
