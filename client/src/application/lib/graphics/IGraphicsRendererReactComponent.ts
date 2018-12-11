import {MouseEvent} from "react";

import {AbstractCanvasGraphicsRenderObject} from "./graphics_objects";
import {IPoint} from "./types";

export interface IGraphicsRendererReactComponent {

  onRenderingObjectSelected(object: AbstractCanvasGraphicsRenderObject | null): void;

  handleContextDown(event: MouseEvent): void;
  handleLayoutMouseDown(event: MouseEvent): void;
  handleLayoutMouseMove(event: MouseEvent): void;
  handleLayoutMouseEnter(event: MouseEvent): void;
  handleLayoutMouseLeave(event: MouseEvent): void;

  getPercentageMouseEventCoordinate(event: MouseEvent): IPoint;

  resize(width: number, height: number): void;
}
