import {IXCoreResponse} from "@Api/x-core/exchange/IXCoreResponse";

export interface IXCoreFailedResponse extends IXCoreResponse {
  status: number;
  error: string;
}
