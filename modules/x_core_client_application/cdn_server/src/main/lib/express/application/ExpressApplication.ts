import {Express, Request, Response} from "express";

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
    this.express.use((request: Request, res: Response) => {

      res.status(404);

      res.json({
        code: 404,
        error: "Requested route was not found."
      });
    });

    // error handler
    this.express.use((error: any, request: Request, response: Response) => {

      response.status(error.status || 500);

      response.json({
        code: error.status || response.status,
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
