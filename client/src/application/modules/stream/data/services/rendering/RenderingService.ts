import {TypeUtils} from "@redux-cbd/utils";

// Lib.
import {AbstractCanvasGraphicsRenderObject, AbstractCanvasGraphicsSerializableObject, ISerializedGraphicsObject} from "@Lib/graphics";

// Data.
import {DESCRIPTORS_MAP, ICanvasObjectDescriptor} from "@Module/stream/data/services/rendering/description";

export class RenderingService {

  public getRenderingDescriptors()/*: Array<ICanvasObjectDescriptor> */ {
    return DESCRIPTORS_MAP;
  }

  public getDescriptor(object: AbstractCanvasGraphicsRenderObject<any> | string) {

    const isString: boolean = TypeUtils.isString(object);

    if (isString) {
      return DESCRIPTORS_MAP[object as string];
    } else {
      const descriptor =  Object.values(DESCRIPTORS_MAP).find((it) => it.prototype === Object.getPrototypeOf(object));

      if (!descriptor) {
        throw new Error("Could not match descriptor for " + Object.getPrototypeOf(object).name);
      }

      return descriptor;
    }
  }

  public serializeObjects(objects: Array<AbstractCanvasGraphicsSerializableObject<any>>): Array<ISerializedGraphicsObject> {
    return objects.map((object) => object.serialize());
  }

  public deserializeObject(objectSerialized: ISerializedGraphicsObject): AbstractCanvasGraphicsRenderObject<any> {

    const descriptor: ICanvasObjectDescriptor<any> = this.getDescriptor(objectSerialized.class);

    // @ts-ignore constuction
    return new (descriptor.prototype.constructor)();
  }

}
