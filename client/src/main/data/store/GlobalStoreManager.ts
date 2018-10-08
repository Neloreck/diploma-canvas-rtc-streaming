import {routerMiddleware, routerReducer} from "react-router-redux";
import {Action, applyMiddleware, combineReducers,  createStore, Middleware, Reducer, Store} from "redux";
import {cbdMiddleware, CBDStoreManager, StoreManaged} from "redux-cbd";
import {composeWithDevTools} from "redux-devtools-extension/logOnlyInProduction";

import {History} from "history";
import createHistory from "history/createBrowserHistory";

/* State and reducers declaration. */

import {IGlobalStoreState} from "@Main/data/store/IGlobalStoreState";

import {AuthReducer} from "@Main/data/store/auth/reducers/AuthReducer";
import {AuthState} from "@Main/data/store/auth/store/AuthState";

import {ThemeReducer} from "@Main/data/store/theme/reducers/ThemeReducer";
import {ThemeState} from "@Main/data/store/theme/store/ThemeState";

@StoreManaged("GLOBAL_STORE")
export class GlobalStoreManager extends CBDStoreManager<IGlobalStoreState> {

  private readonly history: History = createHistory();

  public getBrowserHistory(): History {
    return this.history;
  }

  protected createStore(): Store<IGlobalStoreState, Action<any>> {
    const middlewares: Array<Middleware> = [cbdMiddleware, routerMiddleware(this.history)];
    const composeEnhancers = composeWithDevTools({});

    return createStore(this.createGlobalRootReducer(), composeEnhancers(applyMiddleware(...middlewares)));
  }

  private createGlobalRootReducer(): Reducer<IGlobalStoreState, Action> {
    return combineReducers( {
      auth: new AuthReducer().asFunctional(new AuthState(), { freezeState: true }),
      routing: routerReducer,
      theme: new ThemeReducer().asFunctional(new ThemeState(), { freezeState: true })
    });
  }

}
