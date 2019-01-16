import {AbstractRestNetworkClient} from "@Lib/api/AbstractRestNetworkClient";

import {IXCoreFailedResponse, xCoreClientConfig} from "@Api/x-core";
import {IAuthInfoRequest, IRegisterRequest, ITokensRequest} from "@Api/x-core/auth/requests";
import {IAuthInfoResponse, IRegisterResponse, ITokensResponse} from "@Api/x-core/auth/responses";

export class AuthClient extends AbstractRestNetworkClient {

  private static AUTH_MAPPING: string = "/auth";

  public getHeaders: () => Headers = xCoreClientConfig.getDefaultHeaders;
  public getServerUrl: () => string = xCoreClientConfig.getServerUrl;

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
