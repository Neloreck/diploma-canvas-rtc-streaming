export interface ITokenData {
  access_token: string;
  refresh_token: string;
  expires: number;
  received: number;
}

export interface IUserAuthData {
  username: string;
}
