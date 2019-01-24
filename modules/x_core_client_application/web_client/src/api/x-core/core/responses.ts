export interface IXCoreResponse {
  success: boolean;
  status: number;
  error?: any;
}

export interface IXCoreFailedResponse extends IXCoreResponse {
  status: number;
  error: Error;
}
