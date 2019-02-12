import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { Request as $Request, Response as $Response } from "express";
import * as path from "path";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {

  public catch(error: { response: { message: string, error: string } }, host: ArgumentsHost): void {

    const response: $Response = host.switchToHttp().getResponse();
    const request: $Request = host.switchToHttp().getRequest();
    const status: number = (error instanceof HttpException) ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    // Todo: Replace as nginx static.
    if (status === HttpStatus.NOT_FOUND && !request.path.startsWith("/api/")) {
      response.sendFile(path.resolve(__dirname, "../../../resources/public/index.html"));
    } else {
      response.json({
        error: {
          message: error.response.message,
          type: error.response.error
        },
        success: false
      });
    }
  }

}
