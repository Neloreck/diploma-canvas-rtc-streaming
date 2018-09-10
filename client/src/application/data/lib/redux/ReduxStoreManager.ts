import {routerMiddleware, routerReducer} from "react-router-redux";
import {Action, applyMiddleware, combineReducers,  createStore, Middleware, Reducer, Store} from "redux";
import {cbdMiddleware} from "redux-cbd";
import {composeWithDevTools} from "redux-devtools-extension/logOnlyInProduction";

import {History} from "history";
import createHistory from "history/createBrowserHistory";

import {Single} from "@Annotate";
import {IGlobalStoreState} from "@Redux";

import {AuthReducer} from "@Store/auth/reducers/AuthReducer";
import {AuthState} from "@Store/auth/store/AuthState";
import {ThemeReducer} from "@Store/theme/reducers/ThemeReducer";
import {ThemeState} from "@Store/theme/store/ThemeState";

@Single
export class ReduxStoreManager {

  private readonly history: History = createHistory();
  private readonly rootReducer: Reducer<IGlobalStoreState, Action> = this.createGlobalReducer();
  private readonly store: Store<IGlobalStoreState, Action<any>> = this.createGlobalStore();

  public getRootReducer() {
    return this.rootReducer;
  }

  public getBrowserHistory(): History {
    return this.history;
  }

  public getGlobalStore(): Store<{}, Action<any>> {
    return this.store;
  }

  private createGlobalReducer(): Reducer<IGlobalStoreState, Action> {
    return combineReducers( {
      auth: new AuthReducer().asFunctional(new AuthState(), { freezeState: true }),
      routing: routerReducer,
      theme: new ThemeReducer().asFunctional(new ThemeState(), { freezeState: true })
    });
  }

  private createGlobalStore(): Store<IGlobalStoreState, Action<any>> {
    const middlewares: Array<Middleware> = [cbdMiddleware, routerMiddleware(this.history)];
    const composeEnhancers = composeWithDevTools({});

    return createStore(this.rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
  }

}
