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

  public beforeMove(moveTo: IPoint, moveFrom: IPoint) { /*nothing*/ }

  public afterMove(moveTo: IPoint, moveFrom: IPoint) { /*nothing*/ }

  // Move function for shape.
  protected abstract onMove(moveTo: IPoint, moveFrom: IPoint): void;

}
