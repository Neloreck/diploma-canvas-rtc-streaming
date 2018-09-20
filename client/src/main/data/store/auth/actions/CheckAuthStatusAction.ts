import {ActionWired, AsyncAction} from "redux-cbd";

import {CheckAuthStatusErrorAction} from "@Main/data/store/auth/actions/CheckAuthStatusErrorAction";
import {SetAuthDataAction} from "@Main/data/store/auth/actions/SetAuthDataAction";

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
