import {ReactContextManager} from "@redux-cbd/context";

import {Optional} from "@Lib/ts/type";

import {IUserAuthData} from "./models/IUserAuthData";

export interface IAuthContext {
  authActions: {
  };
  authState: {
    authorizing: boolean;
    authData: Optional<IUserAuthData>;
  };
}

export class AuthContextManager extends ReactContextManager<IAuthContext> {

  protected context: IAuthContext = {
    authActions: {},
    authState: {
      authData: null,
      authorizing: false
    }
  };

}
