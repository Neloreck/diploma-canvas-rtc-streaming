import {ReactContextManager} from "@redux-cbd/context";

import {Optional} from "@Lib/ts/type";

import {IUserAuthData} from "./models/IUserAuthData";

export interface IAuthContextState {
  authActions: {
  };
  authState: {
    authorizing: boolean;
    authData: Optional<IUserAuthData>;
  };
}

export class AuthContext extends ReactContextManager<IAuthContextState> {

  protected state: IAuthContextState = {
    authActions: {},
    authState: {
      authData: null,
      authorizing: false
    }
  };

}
