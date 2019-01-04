import {IXCoreRequest} from "@Api/x-core/exchange/IXCoreRequest";

export interface ITokensRequest extends IXCoreRequest {
  grant_type: string;
  username: string;
  password: string;
}
