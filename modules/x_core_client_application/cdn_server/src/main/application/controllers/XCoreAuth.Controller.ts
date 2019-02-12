import { Body, Controller, Get, Headers, Post, Response } from "@nestjs/common";
import { Response as $Response } from "express";

// Application.
import { XCoreAuthService } from "@Application/services";

@Controller("/auth")
export class XCoreAuthController {

  public constructor(private readonly xCoreAuthService: XCoreAuthService) {}

  @Post("/login")
  private async login(@Body() body: { username?: string, password?: string }): Promise<object> {

    try {

      if (body.username && body.password) {
        return await this.xCoreAuthService.login(body.username, body.password);
      }

      return {
        error: {
          message: "Correct request body params are missing.",
          type: "BadRequest"
        },
        success: false
      };

    } catch (error) {
      return {
        error: {
          message: "Server does not respond.",
          type: "InfoCheckError"
        },
        success: false
      };
    }
  }

  @Get("/info")
  private async getAuthInfo(@Headers() headers: Headers, @Response() response: $Response): Promise<object> {

    try {
      return await this.xCoreAuthService.getHeadersAuthorizedInfo(headers as any);
    } catch (error) {

      response.status(500);

      return {
        error: {
          message: "Server does not respond.",
          type: "InfoCheckError"
        },
        success: false,
      };
    }
  }

}
