import {AbstractCanvasGraphicsRenderObject} from "@Lib/graphics";

export interface ICanvasObjectDescriptor<PrototypeType extends AbstractCanvasGraphicsRenderObject> {
  name: string;
  description: string;
  prototype: PrototypeType;
}
