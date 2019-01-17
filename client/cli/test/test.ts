import {EntryPoint} from "@redux-cbd/utils";
// @ts-ignore
import * as jest from "jest";
import {JEST_CONFIG} from "./config/jest.config";

@EntryPoint()
export class TestRunner {

  public static main(): void {

    const args: Array<string> = process.argv.slice(2);

    process.stdout.write(`Starting testing. \n`);
    jest.run([...args, "--all", "--config", JSON.stringify(JEST_CONFIG), "--detectOpenHandles"]);
  }

}
