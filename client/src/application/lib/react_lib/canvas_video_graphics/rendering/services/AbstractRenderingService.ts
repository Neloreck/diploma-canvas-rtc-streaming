import {MouseEvent} from "react";

import {ICanvasGraphicsSizingContext} from "../context/ICanvasGraphicsSizingContext";
import {CanvasGraphicsRenderObject} from "../graphics_objects/abstract/CanvasGraphicsRenderObject";

import {IPoint} from "../context";

export abstract class AbstractRenderingService {

  /* Setters: */

  public abstract setMouseDown(isMouseDown: boolean, mouseTouch: IPoint | null): void;
  public abstract setMouseTouch(mouseTouch: IPoint): void;
  public abstract setSizing(sizing: ICanvasGraphicsSizingContext): void;
  public abstract setRenderContext(context: CanvasRenderingContext2D): void;
  public abstract setRenderObjects(objects: Array<CanvasGraphicsRenderObject>): void;

  public abstract enableRendering(): void;
  public abstract disableRendering(): void;
  public abstract enableInteraction(): void;
  public abstract disableInteraction(): void;

  /* Events handlers: */

  public abstract handleMouseDown(event: MouseEvent): void;

  public abstract handleMouseUp(event: MouseEvent): void;

  public abstract handleMouseMove(event: MouseEvent): void;

  public abstract handleMouseEnter(event: MouseEvent): void;

  public abstract handleMouseLeave(event: MouseEvent): void;

  /* Rendering: */

  public abstract render(): void;
  public abstract clear(): void;

}
