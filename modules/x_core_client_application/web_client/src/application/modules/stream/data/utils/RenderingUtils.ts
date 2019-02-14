// Lib.
import { AbstractCanvasGraphicsRenderObject, AbstractCanvasGraphicsSerializableObject, ISerializedGraphicsObject } from "@Lib/graphics";

// Data.
import { DESCRIPTORS_MAP, ICanvasObjectDescriptor } from "@Module/stream/lib/graphics/description";

export const getRenderingDescriptors = (): typeof DESCRIPTORS_MAP =>/*: Array<ICanvasObjectDescriptor> */ DESCRIPTORS_MAP;

export const getDescriptor = (object: AbstractCanvasGraphicsRenderObject<any> | string): ICanvasObjectDescriptor<any> => {

  const isString: boolean = (Object.prototype.toString.call(object) === "[object String]");

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
};

export const serializeObjects = (objects: Array<AbstractCanvasGraphicsSerializableObject<any>>): Array<ISerializedGraphicsObject> => {
  return objects.map((object: AbstractCanvasGraphicsSerializableObject<any>) => object.serialize());
};

export const deserializeObjects = (objects: Array<ISerializedGraphicsObject>): Array<AbstractCanvasGraphicsRenderObject<any>> => {
  return objects.map((objectSerialized: ISerializedGraphicsObject) => deserializeObject(objectSerialized));
};

export const deserializeObject = (objectSerialized: ISerializedGraphicsObject): AbstractCanvasGraphicsRenderObject<any> => {

  const descriptor: ICanvasObjectDescriptor<any> = getDescriptor(objectSerialized.className);
  const object: AbstractCanvasGraphicsRenderObject<any> = new (descriptor.prototype.constructor)();

  object.applySerialized(objectSerialized);

  return object;
};
