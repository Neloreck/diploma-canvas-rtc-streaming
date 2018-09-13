import {routerMiddleware, routerReducer} from "react-router-redux";
import {Action, applyMiddleware, combineReducers,  createStore, Middleware, Reducer, Store} from "redux";
import {cbdMiddleware} from "redux-cbd";
import {composeWithDevTools} from "redux-devtools-extension/logOnlyInProduction";

import {History} from "history";
import createHistory from "history/createBrowserHistory";

import {Single} from "@Annotate";
import {IGlobalStoreState} from "@Redux";

// Reducers.

import {AuthReducer} from "@Store/auth/reducers/AuthReducer";
import {AuthState} from "@Store/auth/store/AuthState";

import {InputSourceReducer} from "@Store/input_source/reducers/InputSourceReducer";
import {InputSourceState} from "@Store/input_source/store/InputSourceState";

import {ThemeReducer} from "@Store/theme/reducers/ThemeReducer";
import {ThemeState} from "@Store/theme/store/ThemeState";

@Single
export class ReduxStoreManager {

  private readonly history: History = createHistory();
  private readonly rootReducer: Reducer<IGlobalStoreState, Action> = this.createGlobalReducer();
  private readonly store: Store<IGlobalStoreState, Action<any>> = this.createGlobalStore();

  public getRootReducer(): Reducer<IGlobalStoreState, Action<any>> {
    return this.rootReducer;
  }

  public getBrowserHistory(): History {
    return this.history;
  }

  public getGlobalStore(): Store<{}, Action<any>> {
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
      inputSource: new InputSourceReducer().asFunctional(new InputSourceState(), {freezeState: true}),
      routing: routerReducer,
      theme: new ThemeReducer().asFunctional(new ThemeState(), { freezeState: true })
    });
  }

}
