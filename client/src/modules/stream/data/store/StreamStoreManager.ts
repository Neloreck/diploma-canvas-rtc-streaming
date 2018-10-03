import {Action, applyMiddleware, combineReducers,  createStore, Middleware, Reducer, Store} from "redux";
import {cbdMiddleware, CBDStoreManager} from "redux-cbd";

import {Single} from "@Lib/annotate";

/*
 * Stream store reducers.
 */

import {IStreamStoreState} from "@Module/stream/data/store/IStreamStoreState";

import {InputSourceReducer} from "@Module/stream/data/store/input_source/reducers/InputSourceReducer";
import {InputSourceState} from "@Module/stream/data/store/input_source/store/InputSourceState";

@Single
export class StreamStoreManager extends CBDStoreManager {

  private static readonly STORE_KEY = "STREAM_STORE";

  private readonly rootReducer: Reducer<IStreamStoreState, Action> = this.createGlobalReducer();
  private readonly store: Store<IStreamStoreState, Action<any>> = this.createGlobalStore();

  /*
   * Store getters:
   */

  public getStoreKey(): string {
    return StreamStoreManager.STORE_KEY;
  }

  public getStore(): Store<{}, Action<any>> {
    return this.store;
  }

  /*
   * Store init methods:
   */

  private createGlobalStore(): Store<IStreamStoreState, Action<any>> {
    const middlewares: Array<Middleware> = [cbdMiddleware];

    return createStore(this.rootReducer, applyMiddleware(...middlewares));
  }

  private createGlobalReducer(): Reducer<IStreamStoreState, Action> {
    return combineReducers( {
      inputSource: new InputSourceReducer().asFunctional(new InputSourceState(), { freezeState: true })
    });
  }

}
