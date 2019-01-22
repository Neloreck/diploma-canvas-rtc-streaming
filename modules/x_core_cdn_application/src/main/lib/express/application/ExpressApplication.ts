import {Express, NextFunction, Request, Response} from "express";

// Lib.
import {AbstractController, mapControllers} from "@Lib/express/controllers";

export abstract class ExpressApplication {

  protected abstract readonly controllers: Array<typeof AbstractController>;
  protected abstract readonly express: Express;

  protected constructor() {}

  public getExpress(): Express {
    return this.express;
  }

  protected abstract initializeMiddlewares(): void;

  protected initializeRoutes(): void {
    mapControllers(this.express, ...this.controllers);
  }

  protected handle400Errors(): void {

    // catch 404 and forward to error handler
    this.express.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404);
      next();
    });

    // error handler
    this.express.use((err: any, req: any, res: any, next: any) => {

      res.locals.message = err.message;
      res.locals.error = req.this.express.get("env") === "development" ? err : {};

      res.status(err.status || 500);
      res.json({
        coder: err.status || res.status,
        error: "Got unexpected error."
      });
    });
  }

  protected initialize(): void {
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.handle400Errors();
  }

}
