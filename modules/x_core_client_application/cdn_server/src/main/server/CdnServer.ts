#!/usr/bin/env node

import {createServer, Server} from "http";

import "reflect-metadata";

// Lib.
import {Logger} from "@Lib/utils/logger";

// App.
import {CdnApplication} from "@Application";
import {serverConfig} from "@Server/configs";

export class CdnServer {

  public readonly log: Logger = new Logger("[✴️ SERVER]");

  public application: CdnApplication;
  public instance!: Server;

  constructor() {
    this.application = new CdnApplication();
  }

  public start(): void {

    this.log.info("========================================");
    this.log.info("= =      Server initialization.      = =");
    this.log.info("========================================");

    this.instance = createServer(this.application.getExpress());

    this.instance.on("error", (...args: Array<any>) => this.log.error("Server failed to start:", ...args));
    this.instance.on("listening", () => {
      this.log.info("========================================");
      this.log.info(`= Server initialized. Listening port: '${serverConfig.port}'.`);
      this.log.info("========================================");
    });
    this.instance.listen(serverConfig.port);
  }

}
