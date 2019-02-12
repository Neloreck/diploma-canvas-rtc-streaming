import { Injectable, MiddlewareFunction, NestMiddleware } from "@nestjs/common";
import { Request as $Request, Response as $Response } from "express";

// Application.
import { StatsService } from "@Application/services";

@Injectable()
export class StatsMiddleware implements NestMiddleware {

  public constructor(private readonly statsService: StatsService) {}

  public resolve(): MiddlewareFunction {

    return (req: $Request, res: $Response, next: any): void => {
      this.statsService.requestsCount++;
      next();
    };
  }

}
