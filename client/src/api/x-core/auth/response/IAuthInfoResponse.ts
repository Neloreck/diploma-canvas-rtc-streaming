import {IXCoreResponse} from "@Api/x-core/exchange/IXCoreResponse";

export interface IAuthInfoResponse extends IXCoreResponse {
  authenticated: boolean;
  username: string;
}
