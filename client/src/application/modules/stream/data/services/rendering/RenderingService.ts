import {CanvasGraphicsRenderObject} from "@Lib/react_lib/canvas_video_graphics";

import {SimpleCircle, SimpleRectangle, VideoFrame} from "@Module/stream/data/services/rendering/canvas_objects";

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
    }
  ];

  public getRenderingDescriptors()/*: Array<ICanvasObjectDescriptor> */ {
    return RenderingService.RENDER_DESCRIPTORS;
  }

  public getDescriptor(object: CanvasGraphicsRenderObject) {
    return RenderingService.RENDER_DESCRIPTORS.find(((it) => it.prototype === Object.getPrototypeOf(object))) || null;
  }

}
