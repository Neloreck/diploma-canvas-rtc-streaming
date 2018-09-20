import {ActionWired, SimpleAction} from "redux-cbd";

import {Optional} from "@Lib/type/Optional";

@ActionWired("NETWORK_REQUEST_ERROR")
export class NetworkRequestErrorAction extends SimpleAction {

  public payload: { error: Optional<Error> } = { error: null };

  constructor(error: Error) {
    super();
    this.payload.error = error;
  }

}
