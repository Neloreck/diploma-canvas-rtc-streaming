import {NextFunction, Request, Response} from "express";

// Lib.
import {AbstractController, Controller, Get} from "@Lib/express/controllers";

// Application.
import {statsService} from "@Application/services";

@Controller("/api/info")
export class InfoController extends AbstractController {

  @Get("/stats")
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
