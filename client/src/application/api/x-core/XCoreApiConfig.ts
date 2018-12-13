// Lib.
import {Optional} from "@Lib/ts/types";
import {DocumentStoreUtils} from "@Lib/utils";

export class XCoreApiConfig {

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

    const accessToken: Optional<string> = DocumentStoreUtils.getCookie("access_token");

    if (accessToken) {
      XCoreApiConfig.DEFAULT_HEADERS.set("Authorization", `Bearer ${DocumentStoreUtils.getCookie("access_token")}`);
    } else {
      XCoreApiConfig.DEFAULT_HEADERS.delete("Authorization");
    }

    return XCoreApiConfig.DEFAULT_HEADERS;
  }

  public getServerUrl(): string {
    return XCoreApiConfig.X_CORE_SERVER_URL;
  }

  public getClientId(): string {
    return XCoreApiConfig.X_CORE_CLIENT_ID;
  }

  public getClientSecret(): string {
    return XCoreApiConfig.X_CORE_CLIENT_SECRET;
  }

}
