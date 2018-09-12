import {green, red} from "colors";
import * as webpack from "webpack";

import {WebpackBuildConfig} from "./config/webpack.config";

export class ClientBuilder {

  public static readonly STATS_PRINT_CONFIG = {
    colors: true
  };

  public static build(options): void {
    process.stdout.write(`\nStarted building client bundle in ${green(process.env.NODE_ENV || "unselected")} mode. \n\n`);
    webpack(options).run(this.onFinish);
  }

  public static onFinish(error: any, stats: any): void {
    if (error) {
      process.stdout.write(red("\nFailed to build client bundle: " + "\n" +
        error.toString(ClientBuilder.STATS_PRINT_CONFIG) + "\n"));
    } else {
      process.stdout.write(green("\nSuccessfully built client bundle: " + "\n" +
        stats.toString(ClientBuilder.STATS_PRINT_CONFIG) + "\n"));
    }
  }

}

export default ClientBuilder.build(new WebpackBuildConfig());
