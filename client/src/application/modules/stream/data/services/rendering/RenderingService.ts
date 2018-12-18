// Lib.
import {AbstractCanvasGraphicsRenderObject} from "@Lib/graphics";

// Data.
import {SimpleCircle, SimpleRectangle, VideoFrame} from "@Module/stream/data/services/rendering/canvas_objects";
import {DesktopFrame} from "@Module/stream/data/services/rendering/canvas_objects/DesktopFrame";

export class RenderingService {

  private static RENDER_DESCRIPTORS = [
    {
      description: "Simple rectangle",
      name: "Rectangle",
      prototype: SimpleRectangle.prototype
    }, {
      description: "Simple circle",
      name: "Circle",
      prototype: SimpleCircle.prototype
    }, {
      description: "Additional Input",
      name: "Video Frame",
      prototype: VideoFrame.prototype
    }, {
      description: "Desktop Cast",
      name: "Desktop Sharing",
      prototype: DesktopFrame.prototype
    },
  ];

  public getRenderingDescriptors()/*: Array<ICanvasObjectDescriptor> */ {
    return RenderingService.RENDER_DESCRIPTORS;
  }

  public getDescriptor(object: AbstractCanvasGraphicsRenderObject) {
    return RenderingService.RENDER_DESCRIPTORS.find(((it) => it.prototype === Object.getPrototypeOf(object))) || null;
  }

}
