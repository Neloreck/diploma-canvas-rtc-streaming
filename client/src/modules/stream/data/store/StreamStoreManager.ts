import {Action, applyMiddleware, combineReducers,  createStore, Middleware, Reducer, Store} from "redux";
import {cbdMiddleware, CBDStoreManager, StoreManaged} from "redux-cbd";

/* State and reducers declaration. */

import {IStreamStoreState} from "@Module/stream/data/store/IStreamStoreState";

import {InputSourceReducer} from "@Module/stream/data/store/input_source/reducers/InputSourceReducer";
import {InputSourceState} from "@Module/stream/data/store/input_source/store/InputSourceState";

@StoreManaged("STREAM_STORE")
export class StreamStoreManager extends CBDStoreManager<IStreamStoreState> {

  protected createStore(): Store<IStreamStoreState, Action<any>> {
    const middlewares: Array<Middleware> = [cbdMiddleware];

    return createStore(this.createRootReducer(), applyMiddleware(...middlewares));
  }

  private createRootReducer(): Reducer<IStreamStoreState, Action> {
    return combineReducers( {
      inputSource: new InputSourceReducer().asFunctional(new InputSourceState(), { freezeState: true })
    });
  }

}
