/* tslint:disable: no-console */

export class Logger {

  private static isDev = (): boolean => process.env.NODE_ENV === "development";

  private readonly prefix: string;

  public constructor(prefix: string) {
    this.prefix = prefix;
  }

  public getPrefixed(prefix: string): Logger {
    return new Logger(this.prefix + " " + prefix);
  }

  public debug(...args: Array<any>): void {
    if (Logger.isDev()) {
      console.debug(this.prefix, "[D]", ...args);
    }
  }

  public warn(...args: Array<any>): void {
    if (Logger.isDev()) {
      console.warn(this.prefix, ...args);
    }
  }

  public error(...args: Array<any>): void {
    console.error(this.prefix, ...args);
  }

  public info(...args: Array<any>): void {
    if (Logger.isDev()) {
      console.info(this.prefix, ...args);
    }
  }

}
