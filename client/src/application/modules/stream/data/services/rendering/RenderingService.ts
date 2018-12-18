import {TypeUtils} from "@redux-cbd/utils";

// Lib.
import {AbstractCanvasGraphicsRenderObject} from "@Lib/graphics";

// Data.
import {SimpleCircle, SimpleRectangle, VideoFrame} from "@Module/stream/data/services/rendering/canvas_objects";
import {DesktopFrame} from "@Module/stream/data/services/rendering/canvas_objects/DesktopFrame";
import {ISerializedGraphicsObject} from "@Module/stream/data/services/rendering/ISerializedGraphicsObject";

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

  public getDescriptor(object: AbstractCanvasGraphicsRenderObject | string) {

    const isString: boolean = TypeUtils.isString(object);

    const descriptor = RenderingService.RENDER_DESCRIPTORS.find(((it) => {
      if (isString) {
        return it.name === object;
      } else {
        return it.prototype === Object.getPrototypeOf(object);
      }
    }));

    if (!descriptor) {
      throw new Error("Got undefined object descriptor for " + (isString ? object : (object as AbstractCanvasGraphicsRenderObject).getName()));
    }

    return descriptor;
  }

  public serializeObjects(objects: Array<AbstractCanvasGraphicsRenderObject>): Array<ISerializedGraphicsObject> {
    return objects.map((object) => this.serializeObject(object));
  }

  public serializeObject(object: AbstractCanvasGraphicsRenderObject): ISerializedGraphicsObject {
    return {
      configuration: object.configuration,
      name: this.getDescriptor(object).name,
      position: {},
    };
  }

  public deserializeObject(objectSerialized: ISerializedGraphicsObject): AbstractCanvasGraphicsRenderObject {

    const descriptor = this.getDescriptor(objectSerialized.name);

    // @ts-ignore constuction
    return new (descriptor.prototype.constructor)();
  }

}
