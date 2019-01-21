import {CONFIG, getRequest, IXCoreFailedResponse, postRequest} from "@Api/x-core";
import {IAuthInfoRequest, IRegisterRequest, ITokensRequest} from "@Api/x-core/auth/requests";
import {IAuthInfoResponse, IRegisterResponse, ITokensResponse} from "@Api/x-core/auth/responses";

const AUTH_MAPPING: string = "/auth";

export const getTokens = async (request: ITokensRequest): Promise<ITokensResponse> => {

  const formData: URLSearchParams = new URLSearchParams();

  formData.append("grant_type", request.grant_type);
  formData.append("username", request.username);
  formData.append("password", request.password);

  const headers: Headers = new Headers();

  CONFIG
    .getDefaultHeaders()
    .forEach((value: string, key: string) => headers.set(key, value));

  headers.set("Authorization", `Basic ${btoa(`${CONFIG.getClientId()}:${CONFIG.getClientSecret()}`)}`);
  headers.set("Content-Type", "application/x-www-form-urlencoded");

  return await postRequest(AUTH_MAPPING + "/token", formData, headers) as ITokensResponse;
};

export const logout = async (request: {}): Promise<{}> =>
  await getRequest(AUTH_MAPPING + "/logout", request) as any;

export const getAuthInfo = async (request: IAuthInfoRequest): Promise<IAuthInfoResponse> =>
  await getRequest(AUTH_MAPPING + "/info", request) as IAuthInfoResponse;

export const refreshTokens = async (request: any): Promise<any> => {
  /* todo; */
};

export const register = async (request: IRegisterRequest): Promise<IRegisterResponse | IXCoreFailedResponse> =>
  await postRequest(AUTH_MAPPING + "/register", request) as IRegisterResponse;
