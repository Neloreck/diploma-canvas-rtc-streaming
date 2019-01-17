/* tslint:disable: no-console */
import {Logger} from "./Logger";

describe("Application Logger behaviour.", () => {

  const changeEnvironment = (env: string) => {
    process.env.NODE_ENV = env;
  };

  it("Should have proper prefixing for messages and prefixing concatenation.", () => {
    changeEnvironment("development");

    let log: Logger = new Logger("[Prefix]");
    console.info = jest.fn((...args: Array<any>) => expect(args[0]).toBe("%c[Prefix]"));
    log.info("Something.");

    log = log.getPrefixed("[Another]");
    console.info = jest.fn((...args: Array<any>) => expect(args[0]).toBe("%c[Prefix] [Another]"));
    log.info("Something");
  });

  it("Should log only in dev mode.", () => {

    const log: Logger = new Logger("[Prefix]");
    const mockFn = console.log = console.error = console.warn = console.info = jest.fn();

    changeEnvironment("development");
    log.info("Something.");
    expect(mockFn).toBeCalled();

    mockFn.mockReset();
    changeEnvironment("production");
    log.info("Something.");
    expect(mockFn).not.toBeCalled();

    mockFn.mockReset();
    changeEnvironment("anything-else");
    log.info("Something.");
    expect(mockFn).not.toBeCalled();
  });

  it("Should log errors always.", () => {

    const log: Logger = new Logger("[Prefix]");
    const mockFn = console.log = console.error = console.warn = console.info = jest.fn();

    changeEnvironment("development");
    log.error("Something.");
    expect(mockFn).toBeCalled();

    mockFn.mockReset();
    changeEnvironment("production");
    log.error("Something.");
    expect(mockFn).toBeCalled();
  });

});
