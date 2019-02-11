import { IXCoreResponse } from "@Api/x-core";

export interface IAuthInfoResponse extends IXCoreResponse {
  authenticated: boolean;
  username: string;
}

export interface IRegisterResponse extends IXCoreResponse {
  id: number;
  username: string;
}

export interface ILoginResponse extends IXCoreResponse {
  error?: Error;
  error_description?: string;
  accessToken: string;
  refreshToken: string;
  expires: number;
  scope: string;
}
