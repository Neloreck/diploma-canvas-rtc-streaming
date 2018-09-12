// @ts-ignore
import * as jest from "jest";
import * as config from "./config/jest.config";

const args: Array<string> = process.argv.slice(2);

jest.run([...args, "--all", "--config", JSON.stringify(config), "--detectOpenHandles"]);
