import {IPoint} from "../../types";
import {AbstractBaseRectangleObject} from "../base/AbstractBaseRectangleObject";
import {AbstractCanvasGraphicsResizableObject} from "../base/AbstractCanvasGraphicsResizableObject";

export class ResizeControl {

  public configuration = {};

  public owner: AbstractCanvasGraphicsResizableObject = null as any;

  public absoluteLeft: number = 0;
  public absoluteTop: number = 0;
  public absoluteWidth: number = 15;
  public absoluteHeight: number = 15;

  protected selectionPadding: number = 0;

  private corner: 0 | 1 | 2 | 3 = 0;

  public constructor() {

//    super();

  }

  public renderSelf(): void {
    this.renderElement();
  }

  public renderInteraction(): void {
    // Do nothing there.
  }

  public afterMove(): void {
    if (this.owner && this.owner instanceof AbstractBaseRectangleObject) {
      // (this.owner as AbstractBaseRectangleObject).afterResizeControlMoved(this, this.corner);
    }
  }

  public isInResizeBounds(target: IPoint): boolean { return false; }

  public updateAbsoluteSizing(absoluteLeft: number, absoluteTop: number, absoluteWidth: number, absoluteHeight: number): void {

    this.absoluteLeft = absoluteLeft;
    this.absoluteTop = absoluteTop;
    this.absoluteWidth = absoluteWidth;
    this.absoluteHeight = absoluteHeight;
  }

  public setOwner(owner: AbstractCanvasGraphicsResizableObject): void {
    this.owner = owner;
  }

  public setCorner(corner: 0 | 1 | 2 | 3): void {
    this.corner = corner;
  }

  protected onResize(resizeTo: IPoint, resizeFrom: IPoint): void { /**/ }

  protected onMove(moveFrom: IPoint, moveTo: IPoint): void {

    const boundingRect: { topLeft: IPoint, topRight: IPoint, botLeft: IPoint, botRight: IPoint } = this.getBoundingRect();

    const halfWidth: number = (boundingRect.topRight.x - boundingRect.topLeft.x) / 2;
    const halfHeight: number = (boundingRect.botLeft.y - boundingRect.topLeft.y) / 2;

    this.setRoot((moveFrom.x - halfWidth), (moveFrom.y - halfHeight));
  }

  protected setRoot(x: number, y: number): void {
    this.absoluteLeft = x;
    this.absoluteTop = y;
  }

  protected getBoundingRect(): { topLeft: IPoint, topRight: IPoint, botLeft: IPoint, botRight: IPoint } {

    const topLeft: IPoint = { x: this.absoluteLeft , y: this.absoluteTop };
    const topRight: IPoint = { x: this.absoluteLeft + this.absoluteWidth, y: this.absoluteTop };
    const botRight: IPoint = { x: this.absoluteLeft + this.absoluteWidth, y: this.absoluteTop + this.absoluteHeight };
    const botLeft: IPoint = { x: this.absoluteLeft, y: this.absoluteTop + this.absoluteHeight };

    return { topLeft, topRight, botLeft, botRight};
  }

  private renderElement(): void {

    // @ts-ignore
    // todo
    const context: CanvasRenderingContext2D = this.getContext();

    context.lineWidth = 2;

    context.beginPath();
    context.rect(this.absoluteLeft, this.absoluteTop, this.absoluteWidth, this.absoluteHeight);
    context.stroke();
    context.closePath();
  }

}
