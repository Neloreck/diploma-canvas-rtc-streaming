import {AbstractController} from "@Lib/express";

export const CONTROLLERS_POOL: { [idx: string]: AbstractController } = {};

export {mapControllers} from "./utils/mapControllers";
export {AbstractController} from "./base/AbstractController";

export * from "./annotations";
