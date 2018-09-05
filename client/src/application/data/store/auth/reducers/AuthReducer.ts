import {ActionHandler} from "@Lib/decorated-redux/types";
import {TestAction} from "@Store/auth/actions/TestAction";
import {AuthState} from "@Store/auth/models/AuthState";

import {AbstractReducer} from "@Lib/decorated-redux";

export class AuthReducer extends AbstractReducer<AuthState> {

  @ActionHandler
  public changeTemp(state: AuthState, action: TestAction): AuthState {
    return { ...state, temp: action.payload.temp };
  }

}
