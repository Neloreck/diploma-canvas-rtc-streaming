import {IXCoreRequest} from "@Api/x-core/general/requests";

export interface IAuthInfoRequest extends IXCoreRequest {
}

export interface IRegisterRequest extends IXCoreRequest {
  username: string;
  mail: string;
  password: string;
}

export interface ITokensRequest extends IXCoreRequest {
  grant_type: string;
  username: string;
  password: string;
}
