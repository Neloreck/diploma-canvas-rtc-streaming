import {IPoint} from "../../../rendering/context";
import {CanvasGraphicsInteractiveObject} from "./CanvasGraphicsInteractiveObject";

export abstract class CanvasGraphicsResizableObject extends CanvasGraphicsInteractiveObject {

  public afterResize(...args: Array<any>): void { /*nothing*/ }

  public isResizable(): boolean {
    return true;
  }

  public resize(resizeTo: IPoint, resizeFrom: IPoint): void {
    this.onResize(resizeTo, resizeFrom);
  }

  public abstract isInResizeBounds(x: number, y: number): boolean;

  public abstract isInBounds(x: number, y: number): boolean;

  protected abstract onMove(resizeTo: IPoint, resizeFrom: IPoint): void;

  protected abstract onResize(resizeTo: IPoint, resizeFrom: IPoint): void;

}
