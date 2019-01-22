import {NextFunction, Request, Response} from "express";

// Lib.
import {AbstractController, Controller, Get} from "@Lib/express/controllers";

@Controller("/api/info")
export class InfoController extends AbstractController {

  @Get(["/"])
  private getApiInfo(req: Request, res: Response, next: NextFunction): void {

    res.json({ info: "pending"});
  }

  @Get("/something_else")
  private getSomethingElse(req: Request, res: Response, next: NextFunction): void {

    res.json({ info: "pending"});
  }

}
