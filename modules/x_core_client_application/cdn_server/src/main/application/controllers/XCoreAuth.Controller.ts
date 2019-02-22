import { Body, Controller, Get, Headers, Post } from "@nestjs/common";

// Application.
import { XCoreAuthService } from "@Application/services";

@Controller("/auth")
export class XCoreAuthController {

  public constructor(private readonly xCoreAuthService: XCoreAuthService) {}

  @Post("/register")
  private async register(@Body() body: { username?: string, mail?: string, password?: string }): Promise<object> {

    try {

      if (body.username && body.password && body.mail) {
        return await this.xCoreAuthService.register(body.username, body.mail, body.password);
      } else {
        return {
          error: {
            message: "Correct request body params are missing.",
            type: "BadRequest"
          },
          success: false
        };
      }
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

  @Post("/login")
  private async login(@Body() body: { username?: string, password?: string }): Promise<object> {

    try {

      if (body.username && body.password) {
        return await this.xCoreAuthService.login(body.username, body.password);
      } else {
        return {
          error: {
            message: "Correct request body params are missing.",
            type: "BadRequest"
          },
          success: false
        };
      }
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
  private async getAuthInfo(@Headers() headers: Headers): Promise<object> {

    try {

      return await this.xCoreAuthService.getInfo(headers as any);

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

}
