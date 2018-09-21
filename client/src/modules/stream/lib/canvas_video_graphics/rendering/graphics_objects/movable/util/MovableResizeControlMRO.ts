import {IPoint} from "../../../context/IPoint";
import {CanvasGraphicsMovableRectangleObject} from "../../abstract/CanvasGraphicsMovableRectangleObject";
import {CanvasGraphicsResizableObject} from "../../abstract/CanvasGraphicsResizableObject";

export class MovableResizeControlMRO extends CanvasGraphicsMovableRectangleObject {

  public owner: CanvasGraphicsResizableObject = null as any;

  public absoluteLeft: number = 0;
  public absoluteTop: number = 0;
  public absoluteWidth: number = 10;
  public absoluteHeight: number = 10;

  protected selectionPadding: number = 15;

  private corner: 0 | 1 | 2 | 3 = 0;

  public constructor(absoluteLeft: number, absoluteTop: number, absoluteWidth: number, absoluteHeight: number) {

    super();

    this.absoluteLeft = absoluteLeft;
    this.absoluteTop = absoluteTop;
    this.absoluteWidth = absoluteWidth;
    this.absoluteHeight = absoluteHeight;

  }

  public renderSelf(): void {
    this.renderElement();
  }

  public afterMove(): void {
    this.owner.afterResize(this, this.corner);
  }

  public isInResizeBounds(x: number, y: number): boolean { return false; }

  public updateAbsoluteSizing(absoluteLeft: number, absoluteTop: number, absoluteWidth: number, absoluteHeight: number): void {

    this.absoluteLeft = absoluteLeft;
    this.absoluteTop = absoluteTop;
    this.absoluteWidth = absoluteWidth;
    this.absoluteHeight = absoluteHeight;

  }

  public setOwner(owner: CanvasGraphicsResizableObject): void {
    this.owner = owner;
  }

  public setCorner(corner: 0 | 1 | 2 | 3): void {
    this.corner = corner;
  }

  protected onResize(x: number, y: number): void { /**/ }

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

    const context: CanvasRenderingContext2D = this.getContext();

    context.beginPath();
    context.rect(this.absoluteLeft, this.absoluteTop, this.absoluteWidth, this.absoluteHeight);
    context.stroke();
    context.closePath();

  }

}
