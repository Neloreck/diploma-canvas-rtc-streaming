import {CanvasGraphicsRenderObject} from "../CanvasGraphicsRenderObject";

export abstract class CanvasGraphicsMovableObject extends CanvasGraphicsRenderObject {

  protected readonly selectionPadding: number = 5;

  private selected: boolean = false;

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

  }

  public abstract isInBounds(x: number, y: number): boolean;

  protected abstract onMove(x: number, y: number): void;

}
