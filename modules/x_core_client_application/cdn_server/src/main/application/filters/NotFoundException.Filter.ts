import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { Response as $Response } from "express";
import * as path from "path";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {

  public catch(error: Error, host: ArgumentsHost): void {

    const response: $Response = host.switchToHttp().getResponse();
    const status: number = (error instanceof HttpException) ? error.getStatus(): HttpStatus.INTERNAL_SERVER_ERROR;

    // Todo: Replace as nginx static.
    if (status === HttpStatus.NOT_FOUND) {
      response.sendFile(path.resolve(__dirname, "../../../resources/public/index.html"));
    } else {
      response.json({
        error,
        success: false
      });
    }
  }

}
