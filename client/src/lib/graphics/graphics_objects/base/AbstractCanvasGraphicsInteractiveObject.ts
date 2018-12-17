import {IPoint} from "../../types";
import {AbstractCanvasGraphicsRenderObject} from "./AbstractCanvasGraphicsRenderObject";

export abstract class AbstractCanvasGraphicsInteractiveObject extends AbstractCanvasGraphicsRenderObject {

  protected selected: boolean = false;
  protected readonly interactionSpacing: number = 0;

  protected readonly interactionColor: string = "#33ff33";
  protected readonly interactionAbsoluteSize: number = 3;

  /*
   * Interaction related.
   */

  public isInteractive(): boolean {
    return true;
  }

  public isSelected(): boolean {
    return this.selected;
  }

  public setSelected(selected: boolean): void {
    this.selected = selected;
  }

  // Is shape in coordinate bounds.
  public abstract isInBounds(checkPoint: IPoint): boolean;
  public abstract renderInteraction(context: CanvasRenderingContext2D): void;

}
