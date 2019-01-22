#!/usr/bin/env node

import {createServer, Server} from "http";

import "reflect-metadata";

// Lib.
import {EntryPoint} from "@Lib/utils/EntryPoint";
import {Logger} from "@Lib/utils/logger";

// App.
import {CdnApplication} from "@Application";
import {serverConfig} from "@Server/configs";

@EntryPoint()
export class CdnServer {

  public static readonly log: Logger = new Logger("[✴️SERVER]");

  public static application: CdnApplication;
  public static instance: Server;

  public static main(): void {

    CdnServer.log.info("Server initialization.");

    CdnServer.application = new CdnApplication();

    CdnServer.instance = createServer(CdnServer.application.getExpress());

    CdnServer.instance.on("error", (...args: Array<any>) => CdnServer.log.error("Server failed to start:", ...args));
    CdnServer.instance.on("listening", () => CdnServer.log.info(`Server initialized. Listening port: ${serverConfig.port}.`));
    CdnServer.instance.listen(serverConfig.port);
  }

}
