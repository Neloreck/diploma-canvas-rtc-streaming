import { Controller, Get } from "@nestjs/common";

// Application.
import { StatsService } from "@Application/services";

@Controller("/api/")
export class GeneralController {

  public constructor(private readonly statsService: StatsService) {}

  @Get(["/", "/info"])
  public getApiInfo(): object {
    return {
      info: true,
      name: "x-core-cdn"
    };
  }

  @Get("/stats")
  public getRootInfo(): object {

    const currentTime: Date = new Date();

    return {
      date: currentTime,
      name: "x-core cdn application",
      requestsHandled: this.statsService.requestsCount,
      started: this.statsService.startedAt,
      uptime: (((currentTime.getTime() / 1000) - this.statsService.startedAt.getTime() / 1000) / 60).toFixed(2) + " minutes"
    };
  }
}
