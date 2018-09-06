import {TestAction} from "@Store/auth/actions/TestAction";
import {AuthState} from "@Store/auth/models/AuthState";

import {AbstractReducer, ActionHandler} from "redux-cbd";

export class AuthReducer extends AbstractReducer<AuthState> {

  @ActionHandler
  public changeTemp(state: AuthState, action: TestAction): AuthState {
    return { ...state, temp: action.payload.temp };
  }

}
