import {IBoundingRect, IPoint} from "../../types";
import {AbstractCanvasGraphicsMovableObject} from "./AbstractCanvasGraphicsMovableObject";

export abstract class AbstractCanvasGraphicsResizableObject<T> extends AbstractCanvasGraphicsMovableObject<T> {

  // Mark for proper casting.
  public isResizable(): boolean {
    return true;
  }

  /* Resize lifecycle. */

  public resize(resizeTo: IPoint, resizeFrom: IPoint): void {
    this.beforeResize(resizeTo, resizeFrom);
    this.onResize(resizeTo, resizeFrom);
    this.afterResize(resizeTo, resizeFrom);
  }

  public afterResizeControlMoved(boundingRect: IBoundingRect, index: number): void { return; }

  public abstract isInResizeBounds(checkPoint: IPoint): boolean;

  protected beforeResize(resizeTo: IPoint, resizeFrom: IPoint): void { return; }
  protected abstract onResize(resizeTo: IPoint, resizeFrom: IPoint): void;
  protected afterResize(resizeTo: IPoint, resizeFrom: IPoint): void { return; }

}
