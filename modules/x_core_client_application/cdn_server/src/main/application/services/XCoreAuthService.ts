import {log, Logger} from "@Lib/utils/logger";

import {default as fetch, Headers} from "node-fetch";

export class XCoreAuthService {

  private static readonly GRANT_TYPE: string = "password";

  private static readonly CLIENT_ID: string = "X-CORE-CLIENT";
  private static readonly CLIENT_SECRET: string = "eg2sHsu8qb765x65d";

  private readonly log: Logger = log.getPrefixed("[AUTH]");

  public async login(username: string, password: string): Promise<object> {

    this.log.info("Authorizing user:", username);

    const formData: URLSearchParams = new URLSearchParams();

    formData.append("grant_type", XCoreAuthService.GRANT_TYPE);
    formData.append("username", username);
    formData.append("password", password);

    const headers: Headers = new Headers();

    headers.set("Authorization", `Basic ${Buffer.from(`${XCoreAuthService.CLIENT_ID}:${XCoreAuthService.CLIENT_SECRET}`).toString("base64")}`);
    headers.set("Content-Type", "application/x-www-form-urlencoded");

    const rawResponse: any = await fetch("http://localhost:8080/auth/token", {
      body: formData as any,
      headers: headers as any,
      method: "POST"
    });

    const jsonResponse = await rawResponse.json();

    return {
      accessToken: jsonResponse.access_token,
      expires: jsonResponse.expires_in,
      refreshToken: jsonResponse.refresh_token,
      scope: jsonResponse.scope,
      success: true,
    };
  }

  public async getHeadersAuthorizedInfo(headers: Headers): Promise<object> {

    const rawResponse: any = await fetch("http://localhost:8080/auth/info", {
      headers: headers as any,
      method: "GET",
    });

    return (await rawResponse.json());
  }

}
