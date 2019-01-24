import {green, magenta} from "colors";
import {Express, RequestHandler, Router} from "express";

// Libs.
import {AbstractController, CONTROLLERS_POOL} from "@Lib/express/controllers";
import {EMetadataKeys, ERequestMethod} from "@Lib/express/types";
import {log, Logger} from "@Lib/utils/logger";

const logger: Logger = log.getPrefixed("[REST]");

const putRoute = (router: Router, method: ERequestMethod, mapping: string, handler: RequestHandler) => {

  switch (method) {

    case ERequestMethod.POST:
      router.post(mapping, handler);
      break;

    case ERequestMethod.DELETE:
      router.delete(mapping, handler);
      break;

    case ERequestMethod.GET:
      router.get(mapping, handler);
      break;
  }
};

const normalizeUrl = (url: string): string => url.replace("\/\/", "/");

export const mapControllers = (express: Express, ...controllerClasses: Array<typeof AbstractController>): void => {

  logger.info("====================================");
  logger.info("=       Mapping controllers        =");
  logger.info("====================================");

  const expressRouter: Router = Router();

  for (const controllerClass of controllerClasses) {

    /*
     * Controller meta information.
     */

    const isValidController: boolean = Reflect.getMetadata(EMetadataKeys.CONTROLLER_VALID, controllerClass);
    const basePrefix: string = Reflect.getMetadata(EMetadataKeys.CONTROLLER_MAPPING, controllerClass);

    if (isValidController) {

      const controllerMethods = Object
        .getOwnPropertyNames(controllerClass.prototype)
        // @ts-ignore reflective access;
        .filter((prop: string) => typeof controllerClass.prototype[prop] === "function" && prop !== "constructor")
        .filter((prop: string) => Reflect.getMetadata(EMetadataKeys.CONTROLLER_HANDLER_VALID, controllerClass.prototype, prop));

      if (!controllerMethods.length) {
        logger.warn(magenta(`* {${controllerClass.name}) | NONE } *`));
      } else {

        logger.info(magenta(`* {${controllerClass.name} | ['${basePrefix}']} *`));

        // @ts-ignore
        const controller: AbstractController = new controllerClass.prototype.constructor();

        if (CONTROLLERS_POOL[controllerClass.name]) {
          throw new Error("Trying to define controller with same name. Such operation is not supported.");
        }

        CONTROLLERS_POOL[controllerClass.name] = controller;

        for (const method of controllerMethods) {

          const requestMethod: ERequestMethod = Reflect.getMetadata(EMetadataKeys.CONTROLLER_HANDLER_METHOD, controllerClass.prototype, method);
          const requestMapping: string | Array<string> = Reflect.getMetadata(EMetadataKeys.CONTROLLER_HANDLER_MAPPING, controllerClass.prototype, method);

          if (Array.isArray(requestMapping)) {

            logger.info(`[${magenta(requestMethod)}] ${green(JSON.stringify(requestMapping.map((it: string) => normalizeUrl(basePrefix + it))))} @ '${green(method)}'`);

            requestMapping.forEach((mapping: string) => putRoute(expressRouter, requestMethod, normalizeUrl(basePrefix + mapping), controller[method].bind(controller)));
          } else {

            logger.info(`[${magenta(requestMethod)}] ["${green(normalizeUrl(basePrefix + requestMapping))}"] @ '${green(method)}'`);

            putRoute(expressRouter, requestMethod, basePrefix + requestMapping, controller[method].bind(controller));
          }
        }
      }

    } else {
      throw new Error("[REST] Cannot map controller, did not find base mapping.");
    }
  }

  express.use(expressRouter);

  logger.info("====================================");
};
