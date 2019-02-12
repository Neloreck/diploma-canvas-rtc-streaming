import { Injectable } from "@nestjs/common";

@Injectable()
export class StatsService {

  public readonly startedAt: Date = new Date();
  public requestsCount: number = 0;

}
