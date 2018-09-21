import {routerMiddleware, routerReducer} from "react-router-redux";
import {Action, applyMiddleware, combineReducers,  createStore, Middleware, Reducer, Store} from "redux";
import {cbdMiddleware, CBDStoreManager} from "redux-cbd";
import {composeWithDevTools} from "redux-devtools-extension/logOnlyInProduction";

import {History} from "history";
import createHistory from "history/createBrowserHistory";

import {Single} from "@Lib/annotate";

// Reducers.

import {IGlobalStoreState} from "@Main/data/store/IGlobalStoreState";

import {AuthReducer} from "@Main/data/store/auth/reducers/AuthReducer";
import {AuthState} from "@Main/data/store/auth/store/AuthState";

import {ThemeReducer} from "@Main/data/store/theme/reducers/ThemeReducer";
import {ThemeState} from "@Main/data/store/theme/store/ThemeState";

@Single
export class GlobalStoreManager extends CBDStoreManager {

  private static readonly STORE_KEY = "GLOBAL_STORE";

  private readonly history: History = createHistory();
  private readonly rootReducer: Reducer<IGlobalStoreState, Action> = this.createGlobalReducer();
  private readonly store: Store<IGlobalStoreState, Action<any>> = this.createGlobalStore();

  public getBrowserHistory(): History {
    return this.history;
  }

  public getStoreKey(): string {
    return GlobalStoreManager.STORE_KEY;
  }

  public getStore(): Store<{}, Action<any>> {
    return this.store;
  }

  private createGlobalStore(): Store<IGlobalStoreState, Action<any>> {
    const middlewares: Array<Middleware> = [cbdMiddleware, routerMiddleware(this.history)];
    const composeEnhancers = composeWithDevTools({});

    return createStore(this.rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
  }

  private createGlobalReducer(): Reducer<IGlobalStoreState, Action> {
    return combineReducers( {
      auth: new AuthReducer().asFunctional(new AuthState(), { freezeState: true }),
      routing: routerReducer,
      theme: new ThemeReducer().asFunctional(new ThemeState(), { freezeState: true })
    });
  }

}
