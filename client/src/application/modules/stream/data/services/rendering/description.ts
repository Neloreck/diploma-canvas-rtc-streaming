import {ComponentType} from "react";

// Lib.
import {AbstractCanvasGraphicsRenderObject} from "@Lib/graphics";

// View.
import {
  DesktopFrame, DesktopFrameEditForm,
  SimpleCircle, SimpleCircleEditForm,
  SimpleRectangle, SimpleRectangleEditForm,
  VideoFrame, VideoFrameEditForm
} from "@Module/stream/view/components/canvas/canvas_objects";

export interface ICanvasObjectDescriptor<PrototypeType extends AbstractCanvasGraphicsRenderObject> {
  name: string;
  description: string;
  prototype: PrototypeType;
  component: ComponentType<any>;
}

export const DESCRIPTORS_MAP = {

  [SimpleRectangle.name]: {
    component: SimpleRectangleEditForm,
    description: "Simple rectangle",
    name: "Rectangle",
    prototype: SimpleRectangle.prototype,
  },

  [SimpleCircle.name]: {
    component: SimpleCircleEditForm,
    description: "Simple circle",
    name: "Circle",
    prototype: SimpleCircle.prototype
  },

  [VideoFrame.name]: {
    component: VideoFrameEditForm,
    description: "Additional video.",
    name: "Video Frame",
    prototype: VideoFrame.prototype
  },

  [DesktopFrame.name]: {
    component: DesktopFrameEditForm,
    description: "Desktop casting",
    name: "Desktop Frame",
    prototype: DesktopFrame.prototype
  }

};
