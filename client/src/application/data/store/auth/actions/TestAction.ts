import {SyncReduxAction} from "@Lib/decorated-redux/types";
import {ActionType} from "@Lib/decorated-redux/types/ActionType";

@ActionType("TEST_ACTION_CONST")
export class TestAction extends SyncReduxAction {

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

// @ts-ignore
window.t = TestAction;
