import { Controller, Get } from "@nestjs/common";

@Controller("/api/")
export class GeneralController {

  @Get()
  public getApiInfo(): object {
    return {
      info: true,
      name: "x-core-cdn"
    };
  }

}
