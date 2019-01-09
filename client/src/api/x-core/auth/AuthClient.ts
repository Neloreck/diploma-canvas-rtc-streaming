import {AbstractRestNetworkClient} from "@Lib/api/AbstractRestNetworkClient";

import {xCoreClientConfig} from "@Api/x-core";

import {IXCoreFailedResponse} from "@Api/x-core/general/IXCoreFailedResponse";

import {IAuthInfoRequest} from "@Api/x-core/auth/request/IAuthInfoRequest";
import {IRegisterRequest} from "@Api/x-core/auth/request/IRegisterRequest";
import {ITokensRequest} from "@Api/x-core/auth/request/ITokensRequest";
import {IAuthInfoResponse} from "@Api/x-core/auth/response/IAuthInfoResponse";
import {IRegisterResponse} from "@Api/x-core/auth/response/IRegisterResponse";
import {ITokensResponse} from "@Api/x-core/auth/response/ITokensResponse";

export class AuthClient extends AbstractRestNetworkClient {

  private static AUTH_MAPPING: string = "/auth";

  public getHeaders = xCoreClientConfig.getDefaultHeaders;
  public getServerUrl = xCoreClientConfig.getServerUrl;

  // Actions:

  public async logout(request: {}): Promise<{}> {
    return await this.get(AuthClient.AUTH_MAPPING + "/logout", request) as any;
  }

  public async getAuthInfo(request: IAuthInfoRequest): Promise<IAuthInfoResponse> {
    return await this.get(AuthClient.AUTH_MAPPING + "/info", request) as IAuthInfoResponse;
  }

  public async getTokens(request: ITokensRequest): Promise<ITokensResponse> {

    const formData: URLSearchParams = new URLSearchParams();

    formData.append("grant_type", request.grant_type);
    formData.append("username", request.username);
    formData.append("password", request.password);

    const headers: Headers = new Headers();

    xCoreClientConfig
      .getDefaultHeaders()
      .forEach((value: string, key: string) => headers.set(key, value));

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
