import {NextFunction, Request, Response} from "express";

// Lib.
import {statsService} from "@Application/services";

export const statsMiddleware = (req: Request, res: Response, next: NextFunction) => {

  statsService.requestsCount ++;

  next(false);
};
