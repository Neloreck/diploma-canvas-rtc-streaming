import {IXCoreResponse} from "@Api/x-core/general/IXCoreResponse";

export interface IRegisterResponse extends IXCoreResponse {
  id: number;
  username: string;
}
