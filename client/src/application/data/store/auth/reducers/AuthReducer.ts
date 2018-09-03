import {ActionHandler} from "@Lib/decorated-redux/types";
import {TestAction} from "@Store/auth/actions/TestAction";
import {AuthState} from "@Store/auth/models/AuthState";

export class AuthReducer {

  @ActionHandler
  public changeTemp(state: AuthState, action: TestAction): AuthState {
    return { ...state, temp: action.payload.temp };
  }

}
