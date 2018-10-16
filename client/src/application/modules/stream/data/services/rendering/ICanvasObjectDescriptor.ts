import {CanvasGraphicsRenderObject} from "@Lib/react_lib/canvas_video_graphics";

export interface ICanvasObjectDescriptor<T extends CanvasGraphicsRenderObject> {
  name: string;
  description: string;
  prototype: T;
}
