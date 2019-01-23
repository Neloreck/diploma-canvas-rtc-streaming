import {Request, Response} from "express";

// Lib.
import {AbstractController, Controller, Get, Post} from "@Lib/express/controllers";

// Server.
import {xCoreAuthService} from "@Application/services";

@Controller("/auth")
export class XCoreAuthController extends AbstractController {

  @Post("/login")
  private async login(request: Request, response: Response): Promise<void> {

    try {

      response.json(await xCoreAuthService.login(request.body.username, request.body.password));

    } catch (error) {
      response.json({
        error: {
          message: "Server does not respond.",
          type: "InfoCheckError"
        },
        success: false,
      });
    }
  }

  @Get("/info")
  private async getAuthInfo(request: Request, response: Response): Promise<void> {

    try {
      response.json(await xCoreAuthService.getHeadersAuthorizedInfo(request.headers as any));

    } catch (error) {

      response.status(500);

      response.json({
        error: {
          message: "Server does not respond.",
          type: "InfoCheckError"
        },
        success: false,
      });
    }

  }

}
