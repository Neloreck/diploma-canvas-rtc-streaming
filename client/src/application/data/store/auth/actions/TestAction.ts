import {ActionType, SyncReduxAction} from "redux-cbd";

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
