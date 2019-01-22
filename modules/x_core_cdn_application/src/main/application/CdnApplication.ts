import {default as cookieParserMiddleware} from "cookie-parser";
import {Express, json, static as enableStatic, urlencoded} from "express";
import {default as loggerMiddleware} from "morgan";
import * as path from "path";

// Lib.
import {AbstractController, ExpressApplication} from "@Lib/express";

// Controllers.
import * as controllers from "@Application/controllers";
import {statsMiddleware} from "@Application/middlewares/stats";

export class CdnApplication extends ExpressApplication {

  public readonly express: Express = require("express")();

  protected readonly controllers: Array<typeof AbstractController> = [
    ...Object.values(controllers)
  ];

  public constructor() {

    super();

    this.initialize();
  }

  protected initializeMiddlewares(): void {

    this.express.use(loggerMiddleware("dev"));
    this.express.use(statsMiddleware);
    this.express.use(json());
    this.express.use(urlencoded({ extended: false }));
    this.express.use(cookieParserMiddleware());
    this.express.use(enableStatic(path.join(__dirname, "controllers"))); // todo;
  }

}
