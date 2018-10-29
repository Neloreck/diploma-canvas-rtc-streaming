import {IAuthInfoRequest} from "./IAuthInfoRequest";
import {IAuthInfoResponse} from "./IAuthInfoResponse";

import {xCoreClient} from "../";

export class AuthClient {

  private static AUTH_MAPPING: string = "api/auth/";

  public async getAuthInfo(request: IAuthInfoRequest): Promise<IAuthInfoResponse> {
    const response = await xCoreClient.get(AuthClient.AUTH_MAPPING + "info/", );
    return response as any;
  }

}
