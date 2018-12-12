import {IXCoreRequest} from "../exchange/IXCoreRequest";

export interface ITokensRequest extends IXCoreRequest {
  grant_type: string;
  username: string;
  password: string;
}
