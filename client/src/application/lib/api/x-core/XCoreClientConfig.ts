export class XCoreClientConfig {

  private static readonly X_CORE_SERVER_URL: string = "http://localhost:8080/";
  private static readonly DEFAULT_HEADERS: Headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json"
  });

  public getDefaultHeaders(): Headers {
    return XCoreClientConfig.DEFAULT_HEADERS;
  }

  public getServerUrl(): string {
    return XCoreClientConfig.X_CORE_SERVER_URL;
  }

}
