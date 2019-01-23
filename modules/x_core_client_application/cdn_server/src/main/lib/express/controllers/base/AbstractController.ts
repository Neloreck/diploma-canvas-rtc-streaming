import {NextFunction, Request, Response} from "express";

export abstract class AbstractController {
  [index: string]: (request: Request, response: Response, next: NextFunction) => void;
}
