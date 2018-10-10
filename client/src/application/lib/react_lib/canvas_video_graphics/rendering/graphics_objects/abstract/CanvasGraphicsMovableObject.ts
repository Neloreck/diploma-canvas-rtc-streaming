import {CanvasGraphicsResizableObject} from "./CanvasGraphicsResizableObject";

export abstract class CanvasGraphicsMovableObject extends CanvasGraphicsResizableObject {

  protected readonly selectionPadding: number = 5;

  private selected: boolean = false;

  public afterMove(...args: Array<any>) { /*nothing*/ }

  public isSelected(): boolean {
    return this.selected;
  }

  public setSelected(selected: boolean): void {
    this.selected = selected;
  }

  public isMovable(): boolean {
    return true;
  }

  public move(x: number, y: number): void {

    this.onMove(x, y);
    this.afterMove(x, y);

  }

  public abstract isInBounds(x: number, y: number): boolean;

  protected abstract onMove(x: number, y: number): void;

}
