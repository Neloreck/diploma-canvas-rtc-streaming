import {Bind} from "@redux-cbd/utils";

// Lib.
import {Optional} from "@Lib/ts/types";
import {DocumentStoreUtils} from "@Lib/utils";

// Api.
import {ITokenData} from "@Api/x-core/ITokenData";

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

  public readonly exposeClientsToWindow: boolean = (process.env.NODE_ENV === "development");

  @Bind()
  public getDefaultHeaders(): Headers {

    const tokenData: Optional<ITokenData> = DocumentStoreUtils.getFromLocalStorege("token_data");

    if (tokenData) {
      XCoreApiConfig.DEFAULT_HEADERS.set("Authorization", `Bearer ${tokenData.access_token}`);
    } else {
      XCoreApiConfig.DEFAULT_HEADERS.delete("Authorization");
    }

    return XCoreApiConfig.DEFAULT_HEADERS;
  }

  @Bind()
  public getServerUrl(): string {
    return XCoreApiConfig.X_CORE_SERVER_URL;
  }

  @Bind()
  public getClientId(): string {
    return XCoreApiConfig.X_CORE_CLIENT_ID;
  }

  @Bind()
  public getClientSecret(): string {
    return XCoreApiConfig.X_CORE_CLIENT_SECRET;
  }

}
