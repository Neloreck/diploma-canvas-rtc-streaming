import {executeCmd} from "./_cli/executeCmd";

// tslint:disable-next-line
const cliConfig = require("./cli.json");
const processArgs: Array<string> = process.argv;

const cmd: string = processArgs[2];
const cmdArgs: Array<string> = processArgs.slice(3);
const script: string | Array<string> = cliConfig["scripts"][cmd];

executeCmd(cmd, cmdArgs, script)
  .then(() => process.exit(0))
  .catch(() => { process.exit(1); });
