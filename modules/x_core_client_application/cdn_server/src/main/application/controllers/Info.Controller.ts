
// Application.
import { StatsService } from "@Application/services";
import { Controller, Get } from "@nestjs/common";

@Controller("/api/info")
export class InfoController {

  public constructor(private readonly statsService: StatsService) {}

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
