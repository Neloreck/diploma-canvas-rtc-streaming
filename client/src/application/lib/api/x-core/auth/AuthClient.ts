import {IAuthInfoRequest} from "./IAuthInfoRequest";
import {IAuthInfoResponse} from "./IAuthInfoResponse";

import {XCoreClient} from "@Lib/api/x-core/XCoreClient";

export class AuthClient extends XCoreClient {

  private static AUTH_MAPPING: string = "api/auth/";

  public async getAuthInfo(request: IAuthInfoRequest): Promise<IAuthInfoResponse> {
    const response = await this.get(AuthClient.AUTH_MAPPING + "info/", );
    return response as any;
  }

  public async getTokens(request: any): Promise<any> {
    // todo.
  }

  public async refreshTokens(request: any): Promise<any> {
    // todo.
  }

  public async signUp(request: any): Promise<any> {
    // todo.
  }

  public async login(request: any): Promise<any> {
    // todo;
  }

  public async logout(request: any): Promise<any> {
    // todo;
  }

}
