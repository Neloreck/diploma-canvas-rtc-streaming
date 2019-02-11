import { getRequest, IXCoreFailedResponse, postRequest } from "@Api/x-core";
import { IAuthInfoRequest, ILoginRequest, IRegisterRequest } from "@Api/x-core/auth/requests";
import { IAuthInfoResponse, ILoginResponse, IRegisterResponse } from "@Api/x-core/auth/responses";

const AUTH_MAPPING: string = "/auth";

export const login = async (request: ILoginRequest): Promise<ILoginResponse> =>
  await postRequest(`${AUTH_MAPPING}/login`, request) as ILoginResponse;

export const logout = async (request: {}): Promise<{}> =>
  await getRequest(`${AUTH_MAPPING}/logout`, request) as any;

export const getAuthInfo = async (request: IAuthInfoRequest): Promise<IAuthInfoResponse> =>
  await getRequest(`${AUTH_MAPPING}/info`, request) as IAuthInfoResponse;

export const refreshTokens = async (request: any): Promise<any> => {/* todo: Future. */};

export const register = async (request: IRegisterRequest): Promise<IRegisterResponse | IXCoreFailedResponse> =>
  await postRequest(`${AUTH_MAPPING}/register`, request) as IRegisterResponse;
