import {AbstractRestNetworkClient} from "@Lib/api/AbstractRestNetworkClient";

import {xCoreClientConfig} from "@Api/x-core";

import {IAuthInfoRequest} from "@Api/x-core/auth/request/IAuthInfoRequest";
import {IRegisterRequest} from "@Api/x-core/auth/request/IRegisterRequest";
import {ITokensRequest} from "@Api/x-core/auth/request/ITokensRequest";
import {IAuthInfoResponse} from "@Api/x-core/auth/response/IAuthInfoResponse";
import {IRegisterResponse} from "@Api/x-core/auth/response/IRegisterResponse";
import {ITokensResponse} from "@Api/x-core/auth/response/ITokensResponse";
import {IXCoreFailedResponse} from "@Api/x-core/exchange/IXCoreFailedResponse";

export class AuthClient extends AbstractRestNetworkClient {

  private static AUTH_MAPPING: string = "/auth";

  public getHeaders(): Headers {

    const headers: Headers = new Headers();

    xCoreClientConfig.getDefaultHeaders().forEach((value: string, key: string) => headers.set(key, value));
    headers.set("Authorization", `Basic ${btoa(`${xCoreClientConfig.getClientId()}:${xCoreClientConfig.getClientSecret()}`)}`);

    return headers;
  }

  public getServerUrl(): string {
    return xCoreClientConfig.getServerUrl();
  }

  public async getAuthInfo(request: IAuthInfoRequest): Promise<IAuthInfoResponse> {
    return await this.get(AuthClient.AUTH_MAPPING + "/info") as IAuthInfoResponse;
  }

  public async getTokens(request: ITokensRequest): Promise<ITokensResponse> {

    const formData: URLSearchParams = new URLSearchParams();

    formData.append("grant_type", request.grant_type);
    formData.append("username", request.username);
    formData.append("password", request.password);

    const headers: Headers = new Headers();

    xCoreClientConfig.getDefaultHeaders()
      .forEach((value: string, key: string) => {
        headers.set(key, value);
      });

    headers.set("Authorization", `Basic ${btoa(`${xCoreClientConfig.getClientId()}:${xCoreClientConfig.getClientSecret()}`)}`);
    headers.set("Content-Type", "application/x-www-form-urlencoded");

    return await this.post(AuthClient.AUTH_MAPPING + "/token", formData, headers) as ITokensResponse;
  }

  public async refreshTokens(request: any): Promise<any> {
    // todo.
  }

  public async register(request: IRegisterRequest): Promise<IRegisterResponse | IXCoreFailedResponse> {
    return await this.post(AuthClient.AUTH_MAPPING + "/register", request) as IRegisterResponse;
  }

}
