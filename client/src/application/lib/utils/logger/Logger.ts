/* tslint:disable: no-console */

export class Logger {

  private static isDev = (): boolean => process.env.NODE_ENV === "development";

  private readonly prefix: string;
  private enabled: boolean = true;

  public constructor(prefix: string, enabled?: boolean) {
    this.prefix = prefix;

    if (enabled !== undefined) {
      this.enabled = enabled;
    }
  }

  public isEnabled(): boolean {
    return this.enabled === true;
  }

  public enable(): void {
    this.enabled = true;
  }

  public disable(): void {
    this.enabled = false;
  }

  // Functional methods.

  public getPrefixed(prefix: string, enabled?: boolean): Logger {
    return new Logger(this.prefix + " " + prefix, enabled);
  }

  public debug(...args: Array<any>): void {
    if (Logger.isDev() && this.isEnabled()) {
      console.debug(`%c${this.prefix}`, "color: #bada53", "[D]", ...args);
    }
  }

  public warn(...args: Array<any>): void {
    if (Logger.isDev() && this.isEnabled()) {
      console.warn(`%c${this.prefix}`, "color: #bada53", ...args);
    }
  }

  public error(...args: Array<any>): void {
    console.error(`%c${this.prefix}`, "color: #bada53", ...args);
  }

  public info(...args: Array<any>): void {
    if (Logger.isDev() && this.isEnabled()) {
      console.info(`%c${this.prefix}`, "color: #bada53", ...args);
    }
  }

}
