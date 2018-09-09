import {ActionWired, SimpleAction} from "redux-cbd";

@ActionWired("TEST_ACTION_CONST")
export class TestAction extends SimpleAction {

  public readonly payload: {
    temp: number;
  } = {
    temp: 0
  };

  public constructor(newNumber: number) {
    super();
    this.payload.temp = newNumber;
  }

}
