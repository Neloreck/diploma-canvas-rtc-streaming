import {ComponentType} from "react";

// Lib.
import {AbstractCanvasGraphicsRenderObject} from "@Lib/graphics";

// Data.
import {
  DesktopFrame,
  SimpleCircle,
  SimpleRectangle,
  VideoFrame
} from "@Module/stream/data/services/rendering/canvas_objects";

export interface ICanvasObjectDescriptor<PrototypeType extends AbstractCanvasGraphicsRenderObject> {
  name: string;
  description: string;
  prototype: PrototypeType;
  component: ComponentType<any>;
}

export const DESCRIPTORS_MAP = {

  [SimpleRectangle.name]: {
    component: null as any,
    description: "Simple rectangle",
    name: "Rectangle",
    prototype: SimpleRectangle.prototype,
  },

  [SimpleCircle.name]: {
    component: null as any,
    description: "Simple circle",
    name: "Circle",
    prototype: SimpleCircle.prototype
  },

  [VideoFrame.name]: {
    component: null as any,
    description: "Additional video.",
    name: "Video Frame",
    prototype: VideoFrame.prototype
  },

  [DesktopFrame.name]: {
    component: null as any,
    description: "Desktop casting",
    name: "Desktop Frame",
    prototype: DesktopFrame.prototype
  }

};
