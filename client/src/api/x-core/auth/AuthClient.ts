import {AbstractNetworkClient} from "@Lib/api/AbstractNetworkClient";

import {xCoreClientConfig} from "@Api/x-core";

import {IAuthInfoRequest} from "@Api/x-core/auth/request/IAuthInfoRequest";
import {IAuthInfoResponse} from "@Api/x-core/auth/response/IAuthInfoResponse";
import {ITokensResponse} from "@Api/x-core/auth/response/ITokensResponse";

export class AuthClient extends AbstractNetworkClient {

  private static AUTH_MAPPING: string = "/auth";

  public async getAuthInfo(request: IAuthInfoRequest): Promise<IAuthInfoResponse> {
    const response = await this.get(AuthClient.AUTH_MAPPING + "info/", );
    return response as any;
  }

  public async getTokens(username: string, password: string): Promise<ITokensResponse> {

    const formData: URLSearchParams = new URLSearchParams();

    formData.append("grant_type", "password");
    formData.append("username", username);
    formData.append("password", password);

    const headers: Headers = xCoreClientConfig.getDefaultHeaders();

    headers.set("Authorization", `Basic ${btoa(`${xCoreClientConfig.getClientId()}:${xCoreClientConfig.getClientSecret()}`)}`);
    headers.set("Content-Type", "application/x-www-form-urlencoded");

    return await this.post(AuthClient.AUTH_MAPPING + "/token", formData, headers) as ITokensResponse;
  }

  public async refreshTokens(request: any): Promise<any> {
    // todo.
  }

  public async signUp(request: any): Promise<any> {
    // todo.
  }

}
