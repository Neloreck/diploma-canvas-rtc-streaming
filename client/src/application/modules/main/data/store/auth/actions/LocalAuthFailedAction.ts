import {ActionWired, SimpleAction} from "@redux-cbd/core";

@ActionWired("AUTH_AUTHORIZE_LOCAL_FAIL")
export class LocalAuthFailedAction extends SimpleAction {

  public readonly payload: {
  } = {
  };

  public constructor() {
    super();
  }

}
