import {ActionWired, SimpleAction} from "redux-cbd";

@ActionWired("TEST_ACTION_CONST2")
export class TestAction2 extends SimpleAction {

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
