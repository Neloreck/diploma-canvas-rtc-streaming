import {blue, green, red} from "colors";
import {runProcess} from "./runProcess";

export async function executeCmd(cmd: string, cmdArgs: Array<string>, script: string | Array<string>) {

  if (script) {

    const startTime: number = Date.now();

    logStart(cmd);

    try {
      const scriptsToExecute: Array<string> = Array.isArray(script)
        ? script
        : script.split("&&").map((it: string) => it.trim());

      if (scriptsToExecute.length > 1) {
        handlePartialScripts(scriptsToExecute);

        for (const scriptToExecute of scriptsToExecute) {
          try {
            const scriptArgs: Array<string> = scriptToExecute.split(" ");
            await runProcess(scriptArgs[0], [...scriptArgs.slice(1)]);

            handlePartialSuccess(scriptToExecute);
          } catch (error) {
            handlePartialError(scriptToExecute);

            throw error;
          }

        }

      } else {
        process.stdout.write("\n");
        const scriptArgs: Array<string> = scriptsToExecute[0].split(" ");
        await runProcess(scriptArgs[0], [...scriptArgs.slice(1), ...cmdArgs]);
      }

      handleSuccess(cmd, (Date.now() - startTime) / 1000);

    } catch (error) {
      handleError(error, cmd, script.toString());
    }

  } else {
    const errorMessage: string = `Script '${cmd}' was not found. \n\n`;

    process.stdout.write(errorMessage);

    throw new Error(errorMessage);
  }

}

function logStart(cmd: string) {
  if (!process.env.PARENT) {
    process.stdout.write(green("\n=============================================================================\n"));
    process.stdout.write(`${green("=")} ${cmd} ${green("@")} ${process.cwd()} \n`);
    process.stdout.write(green("=============================================================================\n"));
  }
}

function handlePartialScripts(scripts: Array<string>) {
 /* process.stdout.write("Partial scripts were found:\n\n");
  scripts.forEach((script: string) => process.stdout.write(script + "\n"));
  process.stdout.write("\n=================================================================================\n\n");*/
}

function handlePartialSuccess(cmd: string) {
  process.stdout.write(green(`\n + Command [${cmd}]. \n\n`));
}

function handlePartialError(cmd: string) {
  process.stdout.write(red(`\n - Command [${cmd}]. \n`));
}

function handleSuccess(cmd: string, time: number) {
  if (!process.env.PARENT) {
    process.stdout.write(green("\n=============================================================================\n"));
    process.stdout.write(`${green("=")} Command [${cmd}] successfully executed in ${time} sec.\n`);
    process.stdout.write(green("=============================================================================\n\n"));
  }
}

function handleError(error: Error, cmd: string, script: string) {
  const errorMessage: string = `= Process execution error for command '${cmd}'.\n= Script: [${script}].\n` +
    `= Error: ${error.message}\n`;

  if (!process.env.PARENT) {
    process.stderr.write(red("\n=============================================================================\n"));
    process.stderr.write(errorMessage);
    process.stderr.write(red("=============================================================================\n\n"));
  }

  throw new Error(errorMessage);
}