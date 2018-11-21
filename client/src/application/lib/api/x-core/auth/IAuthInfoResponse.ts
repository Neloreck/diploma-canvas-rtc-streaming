import {IXCoreResponse} from "../exchange/IXCoreResponse";

export interface IAuthInfoResponse extends IXCoreResponse {
  success: boolean;
  login: string;
}
