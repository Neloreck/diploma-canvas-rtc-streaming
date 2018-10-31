import {ActionWired, SimpleAction} from "@redux-cbd/core";

import {Optional} from "@Lib/ts/type";

@ActionWired("AUTH_CHECK_CURRENT_STATUS_ERROR")
export class CheckAuthStatusErrorAction extends SimpleAction {

  public payload: { error: Optional<Error> } = { error: null };

  constructor(error: Error) {
    super();
    this.payload.error = error;
  }

}
