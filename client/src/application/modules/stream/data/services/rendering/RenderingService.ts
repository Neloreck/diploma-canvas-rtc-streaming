import {SimpleCircle, SimpleRectangle} from "@Module/stream/data/services/rendering/canvas_objects";
import {ICanvasObjectDescriptor} from "@Module/stream/data/services/rendering/ICanvasObjectDescriptor";

export class RenderingService {

  public static getRenderingDescriptors()/*: Array<ICanvasObjectDescriptor> */ {
    return this.RENDER_DESCRIPTORS;
  }

  private static RENDER_DESCRIPTORS = [
    {
      description: "Simple rectangle",
      name: "Rectangle",
      prototype: SimpleRectangle.prototype
    }, {
      description: "Simple circle",
      name: "Circle",
      prototype: SimpleCircle.prototype
    }
  ];

}
