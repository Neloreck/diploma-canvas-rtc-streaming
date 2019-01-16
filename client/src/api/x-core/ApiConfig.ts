import {Bind} from "@redux-cbd/utils";

// Lib.
import {DocumentStoreUtils} from "@Lib/utils";

export class ApiConfig {

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

    const tokenData: any = DocumentStoreUtils.getFromLocalStorege("token_data");

    if (tokenData && tokenData.access_token) {
      ApiConfig.DEFAULT_HEADERS.set("Authorization", `Bearer ${tokenData.access_token}`);
    } else {
      ApiConfig.DEFAULT_HEADERS.delete("Authorization");
    }

    return ApiConfig.DEFAULT_HEADERS;
  }

  @Bind()
  public getServerUrl(): string {
    return ApiConfig.X_CORE_SERVER_URL;
  }

  @Bind()
  public getClientId(): string {
    return ApiConfig.X_CORE_CLIENT_ID;
  }

  @Bind()
  public getClientSecret(): string {
    return ApiConfig.X_CORE_CLIENT_SECRET;
  }

}
