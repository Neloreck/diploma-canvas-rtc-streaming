import {IXCoreRequest} from "../_core/exchange/IXCoreRequest";

export interface IAuthInfoRequest extends IXCoreRequest {
  login: string;
  password: string;
}
