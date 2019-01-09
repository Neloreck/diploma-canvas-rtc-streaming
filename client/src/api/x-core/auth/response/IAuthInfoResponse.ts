import {IXCoreResponse} from "@Api/x-core/general/IXCoreResponse";

export interface IAuthInfoResponse extends IXCoreResponse {
  authenticated: boolean;
  username: string;
}
