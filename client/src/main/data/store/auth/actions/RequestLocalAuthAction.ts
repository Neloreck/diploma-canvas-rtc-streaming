import {ActionWired, AsyncAction} from "redux-cbd";

import {LocalAuthFailedAction} from "@Main/data/store/auth/actions/LocalAuthFailedAction";
import {SetAuthDataAction} from "@Main/data/store/auth/actions/SetAuthDataAction";

@ActionWired("AUTH_AUTHORIZE_LOCAL_REQUEST")
export class RequestLocalAuthAction extends AsyncAction {

  public readonly payload: {
    temp: number;
  } = {
    temp: 0
  };

  public constructor(newNumber: number) {
    super();

    this.payload.temp = newNumber;
  }

  public async act(): Promise<{username: string, login: string}> {
    return { username: "temp", login: "temp" };
  }

  public afterSuccess(): SetAuthDataAction {
    return new SetAuthDataAction();
  }

  public afterError(): LocalAuthFailedAction {
    return new LocalAuthFailedAction();
  }

}
