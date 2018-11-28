import {CanvasGraphicsRenderObject} from "@Lib/graphics";

export interface ICanvasObjectDescriptor<PrototypeType extends CanvasGraphicsRenderObject> {
  name: string;
  description: string;
  prototype: PrototypeType;
}
