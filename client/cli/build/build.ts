import * as webpack from "webpack";
import {WebpackBuildConfig} from "./config/webpack.config.babel";

export class ClientBuilder {

  public static readonly STATS_PRINT_CONFIG = {
    colors: true
  };

  public static build(options): void {
    process.stdout.write(`Started building client bundle in ${process.env.NODE_ENV || "unselected"} mode. \n`);
    webpack(options).run(this.onFinish);
  }

  public static onFinish(error: any, stats: any): void {
    if (error) {
      process.stdout.write("Failed to build client bundle: " + "\n" +
        error.toString(ClientBuilder.STATS_PRINT_CONFIG) + "\n");
    } else {
      process.stdout.write("Successfully built client bundle: " + "\n" +
        stats.toString(ClientBuilder.STATS_PRINT_CONFIG) + "\n");
    }
  }

}

export default ClientBuilder.build(new WebpackBuildConfig());
