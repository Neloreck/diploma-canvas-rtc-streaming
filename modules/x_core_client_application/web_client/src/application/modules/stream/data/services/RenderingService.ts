import {TypeUtils} from "@redux-cbd/utils";

// Lib.
import {AbstractCanvasGraphicsRenderObject, AbstractCanvasGraphicsSerializableObject, ISerializedGraphicsObject} from "@Lib/graphics";

// Data.
import {DESCRIPTORS_MAP, ICanvasObjectDescriptor} from "@Module/stream/lib/graphics/description";

export class RenderingService {

  public getRenderingDescriptors(): typeof DESCRIPTORS_MAP /*: Array<ICanvasObjectDescriptor> */ {
    return DESCRIPTORS_MAP;
  }

  public getDescriptor(object: AbstractCanvasGraphicsRenderObject<any> | string): ICanvasObjectDescriptor<any> {

    const isString: boolean = TypeUtils.isString(object);

    if (isString) {
      return DESCRIPTORS_MAP[object as string];
    } else {
      const descriptor: ICanvasObjectDescriptor<any> | undefined = Object.values(DESCRIPTORS_MAP).find(
        (it: any) => it.prototype === Object.getPrototypeOf(object)
      );

      if (!descriptor) {
        throw new Error("Could not match descriptor for " + Object.getPrototypeOf(object).name);
      }

      return descriptor;
    }
  }

  public serializeObjects(objects: Array<AbstractCanvasGraphicsSerializableObject<any>>): Array<ISerializedGraphicsObject> {
    return objects.map((object: AbstractCanvasGraphicsSerializableObject<any>) => object.serialize());
  }

  public deserializeObject(objectSerialized: ISerializedGraphicsObject): AbstractCanvasGraphicsRenderObject<any> {

    const descriptor: ICanvasObjectDescriptor<any> = this.getDescriptor(objectSerialized.className);
    const object: AbstractCanvasGraphicsRenderObject<any> = new (descriptor.prototype.constructor)();

    object.applySerialized(objectSerialized);

    return object;
  }

}
