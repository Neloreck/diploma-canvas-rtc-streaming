import {IXCoreResponse} from "./IXCoreResponse";

export interface IXCoreFailedResponse extends IXCoreResponse {
  status: number;
  mapping: string;
  error: Error;
}
