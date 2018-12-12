import {IPoint} from "../../types";
import {AbstractCanvasGraphicsInteractiveObject} from "./AbstractCanvasGraphicsInteractiveObject";

export abstract class AbstractCanvasGraphicsMovableObject extends AbstractCanvasGraphicsInteractiveObject {

  // Mark for casting.
  public isMovable(): boolean {
    return true;
  }

  // Moving lifecycle.

  public move(moveTo: IPoint, moveFrom: IPoint): void {
    this.beforeMove(moveTo, moveFrom);
    this.onMove(moveTo, moveFrom);
    this.afterMove(moveTo, moveFrom);
  }

  protected beforeMove(moveTo: IPoint, moveFrom: IPoint) { /*nothing*/ }
  protected abstract onMove(moveTo: IPoint, moveFrom: IPoint): void;
  protected afterMove(moveTo: IPoint, moveFrom: IPoint) { /*nothing*/ }

}
