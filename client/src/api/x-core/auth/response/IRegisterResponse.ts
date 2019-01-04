import {IXCoreResponse} from "@Api/x-core/exchange/IXCoreResponse";

export interface IRegisterResponse extends IXCoreResponse {
  id: number;
  username: string;
}
