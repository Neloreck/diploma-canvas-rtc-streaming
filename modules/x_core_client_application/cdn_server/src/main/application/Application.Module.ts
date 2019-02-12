import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";

// Application.
import { GeneralController, InfoController, XCoreAuthController } from "@Application/controllers";
import { NotFoundExceptionFilter } from "@Application/filters";
import { StatsMiddleware } from "@Application/middlewares";
import { StatsService, XCoreAuthService } from "@Application/services";

@Module({
  controllers: [
    XCoreAuthController,
    GeneralController,
    InfoController
  ],
  imports: [],
  providers: [
    XCoreAuthService,
    StatsService,
    { provide: APP_FILTER, useClass: NotFoundExceptionFilter }
  ],
})
export class ApplicationModule implements NestModule {

  public configure(consumer: MiddlewareConsumer): void {

    consumer
      .apply(StatsMiddleware)
      .forRoutes("*");
  }

}
