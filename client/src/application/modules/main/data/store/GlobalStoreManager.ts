import {routerMiddleware, routerReducer} from "react-router-redux";
import {Action, applyMiddleware, combineReducers,  createStore, Middleware, Reducer, Store} from "redux";
import {cbdMiddleware, CBDStoreManager, StoreManaged} from "redux-cbd";
import {composeWithDevTools} from "redux-devtools-extension";

import {History} from "history";
import createHistory from "history/createBrowserHistory";

import {appConfig} from "@Main/config";

/* State and reducers declaration: */

import {IGlobalStoreState} from "@Main/data/store/IGlobalStoreState";

import {AuthReducer} from "@Main/data/store/auth/AuthReducer";
import {AuthState} from "@Main/data/store/auth/AuthState";

import {ThemeReducer} from "@Main/data/store/theme/ThemeReducer";
import {ThemeState} from "@Main/data/store/theme/ThemeState";

@StoreManaged("GLOBAL_STORE")
export class GlobalStoreManager extends CBDStoreManager<IGlobalStoreState> {

  private readonly history: History = createHistory();
  private readonly debug: boolean = (true && appConfig.isDev);

  public getBrowserHistory(): History {
    return this.history;
  }

  protected createStore(): Store<IGlobalStoreState, Action<any>> {
    const middlewares: Array<Middleware> = [cbdMiddleware, routerMiddleware(this.history)];
    const composeEnhancers = this.debug ? composeWithDevTools({}) : (it: any): any => it;

    return createStore(this.createRootReducer(), composeEnhancers(applyMiddleware(...middlewares)));
  }

  private createRootReducer(): Reducer<IGlobalStoreState, Action> {
    return combineReducers( {
      auth: new AuthReducer().asFunctional(new AuthState(), { freezeState: true }),
      routing: routerReducer,
      theme: new ThemeReducer().asFunctional(new ThemeState(), { freezeState: true })
    });
  }

}
