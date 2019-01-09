import {IXCoreRequest} from "@Api/x-core/general/IXCoreRequest";

export interface IRegisterRequest extends IXCoreRequest {
  username: string;
  mail: string;
  password: string;
}
