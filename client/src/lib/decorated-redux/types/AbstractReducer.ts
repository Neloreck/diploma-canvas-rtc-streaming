import {Action} from "redux";

import {createReflectiveReducer, IReducerOptions} from "../";
import {SyncReduxAction} from "./SyncReduxAction";

type actionFunc<T> = (s: T, a: SyncReduxAction) => T;
type asFunctional<T> = (s: T, c: IReducerOptions) => ((prevState: T, action: Action) => T );

export abstract class AbstractReducer<T> {

  [index: string]: actionFunc<T> | asFunctional<T>;

  public asFunctional(defaultState: T, config: IReducerOptions): (prevState: T, action: Action) => T {
    return createReflectiveReducer(this, defaultState, config);
  }

}
