import {Action, applyMiddleware, combineReducers,  createStore, Middleware, Reducer, Store} from "redux";
import {cbdMiddleware, CBDStoreManager, StoreManaged} from "redux-cbd";
import {composeWithDevTools} from "redux-devtools-extension";

import {appConfig} from "@Main/config";

/* State and reducers declaration. */

import {IStreamStoreState} from "@Module/stream/data/store/IStreamStoreState";

import {GraphicsReducer, GraphicsState} from "@Module/stream/data/store/graphics";
import {InputSourceReducer, InputSourceState} from "@Module/stream/data/store/input_source";

@StoreManaged("STREAM_STORE")
export class StreamStoreManager extends CBDStoreManager<IStreamStoreState> {

  private readonly debug: boolean = (true && appConfig.isDev);

  protected createStore(): Store<IStreamStoreState, Action<any>> {
    const middlewares: Array<Middleware> = [cbdMiddleware];
    const composeEnhancers = this.debug ? composeWithDevTools({}) : (it: any): any => it;

    return createStore(this.createRootReducer(), composeEnhancers(applyMiddleware(...middlewares)));
  }

  private createRootReducer(): Reducer<IStreamStoreState, Action> {
    return combineReducers( {
      graphics: new GraphicsReducer().asFunctional(new GraphicsState(), { freezeState: true }),
      inputSource: new InputSourceReducer().asFunctional(new InputSourceState(), { freezeState: true })
    });
  }

}
