export class XCoreClientConfig {

  private static readonly X_CORE_CLIENT_ID: string = "X-CORE-CLIENT";
  private static readonly X_CORE_CLIENT_SECRET: string = "eg2sHsu8qb765x65d";

  private static readonly X_CORE_SERVER_URL: string = "http://localhost:3000";

  private static readonly DEFAULT_HEADERS: Headers = new Headers({
    Accept: "application/json",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  });

  public getDefaultHeaders(): Headers {
    return XCoreClientConfig.DEFAULT_HEADERS;
  }

  public getServerUrl(): string {
    return XCoreClientConfig.X_CORE_SERVER_URL;
  }

  public getClientId(): string {
    return XCoreClientConfig.X_CORE_CLIENT_ID;
  }

  public getClientSecret(): string {
    return XCoreClientConfig.X_CORE_CLIENT_SECRET;
  }

}
