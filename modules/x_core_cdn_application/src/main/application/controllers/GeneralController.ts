import {NextFunction, Request, Response} from "express";

// Lib.
import {AbstractController, Controller, Get} from "@Lib/express/controllers";

// Server.
import {statsService} from "@Application/services";

@Controller("/")
export class GeneralController extends AbstractController {

  @Get()
  private getRootInfo(req: Request, res: Response, next: NextFunction): void {

    const currentTime: Date = new Date();

    res.json({
      date: currentTime,
      name: "x-core cdn application",
      requestsHandled: statsService.requestsCount,
      started: statsService.startedAt,
      uptime: (((currentTime.getTime() / 1000) - statsService.startedAt.getTime() / 1000) / 60).toFixed(2) + " minutes"
    });
  }

}
