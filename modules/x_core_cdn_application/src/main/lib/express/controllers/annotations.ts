import {EMetadataKeys, ERequestMethod} from "@Lib/express/types";

export const Controller = (mapping: string): ClassDecorator => {

  return <T extends object>(target: T) => {

    Reflect.defineMetadata(EMetadataKeys.CONTROLLER_VALID, true, target);
    Reflect.defineMetadata(EMetadataKeys.CONTROLLER_MAPPING, mapping, target);

    return target;
  };
};

export const Handler = (requestMethod: ERequestMethod, mapping: string | Array<string> = "/"): MethodDecorator => {

    return <T extends object>(target: T, method: string | symbol) => {

      Reflect.defineMetadata(EMetadataKeys.CONTROLLER_HANDLER_VALID, true, target, method);
      Reflect.defineMetadata(EMetadataKeys.CONTROLLER_HANDLER_METHOD, requestMethod, target, method);
      Reflect.defineMetadata(EMetadataKeys.CONTROLLER_HANDLER_MAPPING, mapping, target, method);

      return target;
    };
};

export const Get = (mapping: string | Array<string> = "/"): MethodDecorator => Handler(ERequestMethod.GET, mapping);
export const Post = (mapping: string | Array<string> = "/"): MethodDecorator => Handler(ERequestMethod.POST, mapping);
export const Delete = (mapping: string | Array<string> = "/"): MethodDecorator => Handler(ERequestMethod.DELETE, mapping);
