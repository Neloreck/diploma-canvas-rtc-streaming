import {IXCoreResponse} from "@Api/x-core/general/IXCoreResponse";

export interface IXCoreFailedResponse extends IXCoreResponse {
  status: number;
  error: Error;
}
