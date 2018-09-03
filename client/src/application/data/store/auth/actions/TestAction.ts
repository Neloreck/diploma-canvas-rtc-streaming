import {SyncReduxAction} from "@Lib/decorated-redux/types";
import {ActionWired} from "@Lib/decorated-redux/types/ActionWired";

@ActionWired("TEST_ACTION_CONST")
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
