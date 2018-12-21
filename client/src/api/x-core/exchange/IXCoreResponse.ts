import {IBaseResponse} from "@Lib/api/IBaseResponse";

export interface IXCoreResponse extends IBaseResponse {
  success: boolean;
  status: number;
  error?: any;
}
