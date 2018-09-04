import {History} from "history";
import createHistory from "history/createBrowserHistory";
import {routerMiddleware} from "react-router-redux";
import {Action, Store} from "redux";
import {applyMiddleware, createStore, Middleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension/logOnlyInProduction";
import thunk from "redux-thunk";

import {convertClassesToObjectsMiddleware} from "@Lib/decorated-redux";

import {IReduxStoreState, reduxCreator} from "@App/data/redux";
import {Single} from "@App/data/utils/decorators";

@Single
export class ReduxStoreManager {

  private static readonly DEVTOOLS_OPTIONS: object = {};

  private readonly HISTORY: History = createHistory();
  private readonly STORE: Store<IReduxStoreState, Action<any>> & { dispatch: () => {} } = this.createStore();

  public getBrowserHistory(): History {
    return this.HISTORY;
  }

  public getReduxStore(): Store<{}, Action<any>> & { dispatch: () => {} } {
    return this.STORE;
  }

  private createStore(): Store<IReduxStoreState, Action<any>> & { dispatch: () => {} } {
    const composeEnhancers = composeWithDevTools(ReduxStoreManager.DEVTOOLS_OPTIONS);
    const reactRouterMiddleware: Middleware = routerMiddleware(this.HISTORY);
    const middlewares: Array<Middleware> = [convertClassesToObjectsMiddleware, thunk, reactRouterMiddleware];

    return createStore(reduxCreator.getRootReducer(), composeEnhancers(applyMiddleware(...middlewares)));
  }

}
