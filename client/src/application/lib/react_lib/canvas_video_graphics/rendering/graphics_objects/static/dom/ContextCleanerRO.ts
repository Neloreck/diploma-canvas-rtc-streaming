import {ICanvasGraphicsSizingContext} from "../../../context/ICanvasGraphicsSizingContext";

import {CanvasGraphicsRenderObject} from "../../base/CanvasGraphicsRenderObject";

export class ContextCleanerRO extends CanvasGraphicsRenderObject {

  public configuration = {};

  public renderSelf(): void {

    const context: CanvasRenderingContext2D = this.getContext();
    const sizing: ICanvasGraphicsSizingContext = this.getSizing();

    context.fillStyle = "#FFF";
    context.fillRect(0, 0, sizing.width, sizing.height);
  }

}
