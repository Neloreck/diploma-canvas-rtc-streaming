import {IXCoreRequest} from "@Api/x-core/exchange/IXCoreRequest";

export interface IRegisterRequest extends IXCoreRequest {
  username: string;
  mail: string;
  password: string;
}
