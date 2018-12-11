import {IBoundingRect, IPoint} from "../../types";
import {AbstractCanvasGraphicsMovableObject} from "./AbstractCanvasGraphicsMovableObject";

export abstract class AbstractCanvasGraphicsResizableObject extends AbstractCanvasGraphicsMovableObject {

  // Mark for casting.
  public isResizable(): boolean {
    return true;
  }

  /* Resize lifecycle. */

  public resize(resizeTo: IPoint, resizeFrom: IPoint): void {
    this.beforeResize(resizeTo, resizeFrom);
    this.onResize(resizeTo, resizeFrom);
    this.afterResize(resizeTo, resizeFrom);
  }

  public afterResizeControlMoved(boundingRect: IBoundingRect, index: number): void { /*nothing*/ }

  public abstract isInResizeBounds(checkPoint: IPoint): boolean;

  protected beforeResize(resizeTo: IPoint, resizeFrom: IPoint): void { /*nothing*/ }

  protected afterResize(resizeTo: IPoint, resizeFrom: IPoint): void { /*nothing*/ }

  protected abstract onResize(resizeTo: IPoint, resizeFrom: IPoint): void;

}
