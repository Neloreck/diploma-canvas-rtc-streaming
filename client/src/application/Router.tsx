import {Wrapped} from "@redux-cbd/utils";
import {History} from "history";
import * as React from "react";
import {PureComponent, ReactNode} from "react";
import {Route, Router as ReactRouter} from "react-router";
import {Switch} from "react-router-dom";

// Data
import {routerContextManager} from "@Main/data/store";

// View.
import {GlobalContextProvider} from "@Main/view/layouts/GlobalContextProvider";
import {lazyLoadComponentFactory} from "@Main/view/utils";

/*
 * Application submodules:
*/

export const AuthorizationModule = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "module@authorization" */"@Module/authorization"));
export const StreamModule = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "module@stream" */"@Module/stream"));
export const HomeModule = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "module@home" */"@Module/home"));

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

@Wrapped(GlobalContextProvider)
export class Router extends PureComponent<any> {

  public render(): ReactNode {

    const history: History = routerContextManager.context.routingState.history;

    return (
      <ReactRouter history={history}>

        <Switch>

          <Route exact={true} path={"/authorization*"} component={AuthorizationModule}/>
          <Route exact={true} path={"/stream*"} component={StreamModule}/>
          <Route exact={true} path={"*"} component={HomeModule}/>

        </Switch>

      </ReactRouter>
    );
  }

}
