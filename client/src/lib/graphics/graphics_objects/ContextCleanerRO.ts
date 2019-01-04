import {ICanvasGraphicsSizingContext} from "../types";
import {AbstractCanvasGraphicsRenderObject} from "./base/AbstractCanvasGraphicsRenderObject";

export class ContextCleanerRO extends AbstractCanvasGraphicsRenderObject<never> {

  public position: never;
  public configuration: never;

  public constructor() {
    super();
  }

  public renderSelf(): void {

    const context: CanvasRenderingContext2D = this.getContext();
    const sizing: ICanvasGraphicsSizingContext = this.getSizing();

    context.fillStyle = "#FFF";
    context.fillRect(0, 0, sizing.width, sizing.height);
  }

}
