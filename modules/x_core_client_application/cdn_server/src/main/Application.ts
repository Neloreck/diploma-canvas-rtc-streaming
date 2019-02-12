import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { default as compression } from "compression";
import { static as staticMiddleware } from "express";
import * as path from "path";

// Lib.
import { EntryPoint } from "@Lib/utils/EntryPoint";

// Application.
import { ApplicationModule } from "@Application/Application.Module";
import { applicationConfig } from "@Application/configs";

@EntryPoint()
export class Application {

  public static async main(): Promise<void> {

    const app: INestApplication = await NestFactory.create(ApplicationModule);

    await app
      .use(staticMiddleware(path.resolve(__dirname, "../resources/public/")))
      .use(compression())
      .listen(applicationConfig.port);
  }

}
