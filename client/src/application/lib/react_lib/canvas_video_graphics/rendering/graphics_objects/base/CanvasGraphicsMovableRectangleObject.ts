import {IBoundingRect, IPoint} from "../../context";
import {CanvasGraphicsMovableObject} from "./CanvasGraphicsMovableObject";

export abstract class CanvasGraphicsMovableRectangleObject extends CanvasGraphicsMovableObject {

  public isInBounds(x: number, y: number): boolean {

    const {topLeft, topRight, botLeft, botRight} = this.getBoundingRect();
    const realPoint: IPoint = {x, y};

    // Additional radius for moving / selection.

    topLeft.x -= this.selectionPadding;
    topLeft.y -= this.selectionPadding;

    topRight.x += this.selectionPadding;
    topRight.y -= this.selectionPadding;

    botLeft.x -= this.selectionPadding;
    botLeft.y += this.selectionPadding;

    botRight.x += this.selectionPadding;
    botRight.y += this.selectionPadding;

    // Check two triangles instead of rectangle.

    const isInFirstTriangle: boolean = this.checkPointInTriangle(realPoint, botLeft, topLeft, topRight);
    const isInSecondTriangle: boolean = this.checkPointInTriangle(realPoint, botLeft, botRight, topRight);

    return isInFirstTriangle || isInSecondTriangle;
  }

  public checkTrianglesSign(p1: IPoint, p2: IPoint, p3: IPoint): boolean {
    return ((p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y)) < 0;
  }

  public checkPointInTriangle(pt: IPoint, v1: IPoint, v2: IPoint, v3: IPoint): boolean {

    const b1 = this.checkTrianglesSign(pt, v1, v2);
    const b2 = this.checkTrianglesSign(pt, v2, v3);
    const b3 = this.checkTrianglesSign(pt, v3, v1);

    return ((b1 === b2) && (b2 === b3));
  }

  protected onMove(moveTo: IPoint, moveFrom: IPoint): void {

    const boundingRect: IBoundingRect = this.getBoundingRect();
    const newPosition: IPoint = { x: 0, y: 0};

    newPosition.x = boundingRect.topLeft.x + (moveTo.x - moveFrom.x);
    newPosition.y = boundingRect.topLeft.y + (moveTo.y - moveFrom.y);

    this.setRoot(newPosition.x, newPosition.y);
  }

  protected renderSelectionOverElement(): void {

    const context: CanvasRenderingContext2D = this.getContext();
    const {width: pWidth, height: pHeight} = this.getPercentageBaseSizing();
    const boundingRect: IBoundingRect = this.getBoundingRect();

    const halfWidth: number = (boundingRect.topRight.x - boundingRect.topLeft.x) / 2;
    const halfHeight: number = (boundingRect.botLeft.y - boundingRect.topLeft.y) / 2;

    const center: IPoint = {
      x: (boundingRect.topRight.x - halfWidth),
      y: (boundingRect.botRight.y - halfHeight)
    };

    context.strokeStyle = "#5dff71";
    context.lineWidth = 3;

    context.beginPath();
    context.arc(center.x, center.y, pWidth * 0.2, 0, 2 * Math.PI);
    context.stroke();
    context.closePath();

    // Over rect.

    boundingRect.topLeft.x -= this.selectionPadding;
    boundingRect.topLeft.y -= this.selectionPadding;

    boundingRect.topRight.x += this.selectionPadding;
    boundingRect.topRight.y -= this.selectionPadding;

    boundingRect.botRight.x += this.selectionPadding;
    boundingRect.botRight.y += this.selectionPadding;

    boundingRect.botLeft.x -= this.selectionPadding;
    boundingRect.botLeft.y += this.selectionPadding;

    this.renderAnimatedDashedLine(boundingRect.topLeft, boundingRect.topRight);
    this.renderAnimatedDashedLine(boundingRect.topRight, boundingRect.botRight);
    this.renderAnimatedDashedLine(boundingRect.botRight, boundingRect.botLeft);
    this.renderAnimatedDashedLine(boundingRect.botLeft, boundingRect.topLeft);

  }

  protected renderAnimatedDashedLine(p1: IPoint, p2: IPoint, count: number = 0): void {

    const context: CanvasRenderingContext2D = this.getContext();

    context.lineDashOffset = -((Date.now() - this.createdAt) % 2000) / 8;

    context.setLineDash([25, 25]);

    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.stroke();
    context.closePath();

    context.setLineDash([0]);
    context.lineDashOffset = 0;

  }

  protected abstract setRoot(x: number, y: number ): void;

  protected abstract getBoundingRect(): IBoundingRect;

}
