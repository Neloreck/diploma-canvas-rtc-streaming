import { Injectable, Logger } from "@nestjs/common";
import { default as fetch, Headers } from "node-fetch";

// Application.
import { applicationConfig } from "@Application/configs/Application.Config";

@Injectable()
export class XCoreAuthService {

  private static readonly AUTH_CONFIG: {
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    GRANT_TYPE: string;
  } = {
    CLIENT_ID: "X-CORE-CLIENT",
    CLIENT_SECRET: "eg2sHsu8qb765x65d",
    GRANT_TYPE: "password"
  };

  private readonly logger: Logger = new Logger("X-CORE-AUTH");

  public async login(username: string, password: string): Promise<object> {

    this.logger.log(`Authorizing user: ${username}.`);

    const formData: URLSearchParams = new URLSearchParams();

    formData.append("grant_type", XCoreAuthService.AUTH_CONFIG.GRANT_TYPE);
    formData.append("username", username);
    formData.append("password", password);

    const headers: Headers = new Headers();

    headers.set("Authorization", `Basic ${Buffer.from(`${XCoreAuthService.AUTH_CONFIG.CLIENT_ID}:${XCoreAuthService.AUTH_CONFIG.CLIENT_SECRET}`).toString("base64")}`);
    headers.set("Content-Type", "application/x-www-form-urlencoded");

    const rawResponse: any = await fetch(`${applicationConfig.apiServerUrl}/auth/token`, {
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

    const rawResponse: any = await fetch(`${applicationConfig.apiServerUrl}/auth/info`, {
      headers: headers as any,
      method: "GET",
    });

    return (await rawResponse.json());
  }

}
