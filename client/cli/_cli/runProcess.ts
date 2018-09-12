import {ChildProcess, spawn} from "child_process";

export function runProcess(item: string, args: Array<string>) {

  // @ts-ignore
  return new Promise((resolve, reject) => {

    try {

      const childProcess: ChildProcess = spawn(item, args,  {
        cwd: process.cwd(),
        detached: true,
        env: { ...process.env, PARENT: "X-CORE-CLI" },
        shell: true,
        stdio: [process.stdin, process.stdout, process.stderr]
      });

      childProcess.on("error", (data: string) => reject(new Error(data.toString())));

      childProcess.on("close", (code: number) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error("Command exited with non 0 code: " + code + "."));
        }
      });

      childProcess.on("exit", (code: number) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error("Command exited with non 0 code: " + code + "."));
        }
      });

    } catch (error) {
      reject(error);
    }

  });
}
