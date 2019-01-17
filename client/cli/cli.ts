import {EntryPoint} from "@redux-cbd/utils";
import {CommandRunner} from "./_cli/CommandRunner";

import cliConfig from "./cli.json";

@EntryPoint()
export class CliRunner {

  public static readonly scriptsKey: string = "scripts";
  public static readonly configKey: string = "config";

  public static async main(): Promise<void> {

    const processArgs: Array<string> = process.argv;
    const cmd: string = processArgs[2];
    const script: string | Array<string> = cliConfig[CliRunner.scriptsKey][cmd];
    const config: string | Array<string> = cliConfig[CliRunner.configKey][cmd];

    const commandRunner: CommandRunner = new CommandRunner(cmd, script, config);

    try {

      await commandRunner.run();

      process.exit(0);
    } catch (error) {
      process.exit(1);
    }
  }

}
