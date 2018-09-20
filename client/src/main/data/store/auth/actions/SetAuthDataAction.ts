import {ActionWired, SimpleAction} from "redux-cbd";

@ActionWired("AUTH_SET_AUTH_DATA")
export class SetAuthDataAction extends SimpleAction {

  public readonly payload: {
  } = {
  };

  public constructor() {
    super();
  }

}
