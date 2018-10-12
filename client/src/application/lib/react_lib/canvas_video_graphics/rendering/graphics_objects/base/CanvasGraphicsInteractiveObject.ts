import {CanvasGraphicsRenderObject} from "./CanvasGraphicsRenderObject";

export abstract class CanvasGraphicsInteractiveObject extends CanvasGraphicsRenderObject {

  public selected: boolean = false;

  public isInteractive(): boolean {
    return true;
  }

  public isSelected(): boolean {
    return this.selected;
  }

  public setSelected(selected: boolean): void {
    this.selected = selected;
  }

  public abstract renderInteraction(): void;

}
