import {CanvasGraphicsResizableObject} from "./CanvasGraphicsResizableObject";

import {IPoint} from "../../context";

export abstract class CanvasGraphicsMovableObject extends CanvasGraphicsResizableObject {

  protected readonly selectionPadding: number = 5;

  public afterMove(...args: Array<any>) { /*nothing*/ }

  public isMovable(): boolean {
    return true;
  }

  public move(moveTo: IPoint, moveFrom: IPoint): void {
    this.onMove(moveTo, moveFrom);
    this.afterMove(moveTo, moveFrom);
  }

  public abstract isInBounds(x: number, y: number): boolean;

  protected abstract onMove(moveTo: IPoint, moveFrom: IPoint): void;

}
