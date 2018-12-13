import {IXCoreResponse} from "../exchange/IXCoreResponse";

export interface ITokensResponse extends IXCoreResponse {
  access_token: string;
  refresh_token: string;
  expires_in: string;
  scope: string;
  token_type: string;
  username: string;
  jti: string;
}
