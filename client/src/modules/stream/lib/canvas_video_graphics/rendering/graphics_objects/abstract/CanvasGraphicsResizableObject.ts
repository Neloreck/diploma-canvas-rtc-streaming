import {CanvasGraphicsRenderObject} from "./CanvasGraphicsRenderObject";

export abstract class CanvasGraphicsResizableObject extends CanvasGraphicsRenderObject {

  public afterResize(...args: Array<any>): void { /*nothing*/ }

  public isResizable(): boolean {
    return true;
  }

  public resize(x: number, y: number): void {
    this.onResize(x, y);
  }

  public abstract isInResizeBounds(x: number, y: number): boolean;

  public abstract isInBounds(x: number, y: number): boolean;

  protected abstract onMove(x: number, y: number): void;

  protected abstract onResize(x: number, y: number): void;

}
