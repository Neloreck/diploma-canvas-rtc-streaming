import {ActionWired, AsyncAction} from "redux-cbd";

import {CheckAuthStatusErrorAction} from "./CheckAuthStatusErrorAction";
import {SetAuthDataAction} from "./SetAuthDataAction";

@ActionWired("AUTH_CHECK_CURRENT_STATUS")
export class CheckAuthStatusAction extends AsyncAction {

  public async act(): Promise<any> {
    return null;
  }

  public afterSuccess(): SetAuthDataAction {
    return new SetAuthDataAction();
  }

  public afterError(error: Error): CheckAuthStatusErrorAction {
    return new CheckAuthStatusErrorAction(error);
  }

}
