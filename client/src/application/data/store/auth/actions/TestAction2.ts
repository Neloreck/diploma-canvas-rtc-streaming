import {ActionWired, SyncReduxAction} from "@Lib/decorated-redux/types";

@ActionWired("TEST_ACTION_CONST2")
export class TestAction2 extends SyncReduxAction {

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
