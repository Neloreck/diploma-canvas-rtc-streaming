import {IXCoreResponse} from "@Api/x-core/general/responses";

export interface IAuthInfoResponse extends IXCoreResponse {
  authenticated: boolean;
  username: string;
}

export interface IRegisterResponse extends IXCoreResponse {
  id: number;
  username: string;
}

export interface ITokensResponse extends IXCoreResponse {
  error?: string;
  error_description?: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  username: string;
  jti: string;
}
