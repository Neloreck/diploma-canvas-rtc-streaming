export interface ITokenData {
  accessToken: string;
  refreshToken: string;
  expires: number;
  received: number;
}

export interface IUserAuthData {
  username: string;
}
