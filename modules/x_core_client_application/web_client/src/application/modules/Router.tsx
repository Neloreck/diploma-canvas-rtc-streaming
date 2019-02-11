import { Provide } from "@redux-cbd/context";
import { Wrapped } from "@redux-cbd/utils";
import * as React from "react";
import { ComponentClass, PureComponent, ReactNode } from "react";
import { Route, Router as ReactRouter } from "react-router";
import { Switch } from "react-router-dom";

// Data
import { authContextManager, routerContextManager, themeContextManager } from "@Main/data/store";

// View.
import { GlobalThemeProvider } from "@Main/view/layouts/GlobalThemeProvider";
import { lazyLoadComponentFactory } from "@Main/view/utils";

// Application submodules:

export const AuthorizationModule: ComponentClass = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "module@authorization" */"@Module/authentication"));
export const StreamModule: ComponentClass = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "module@stream" */"@Module/stream"));
export const HomeModule: ComponentClass = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "module@home" */"@Module/home"));

@Provide(authContextManager, routerContextManager, themeContextManager)
@Wrapped(GlobalThemeProvider)
export class Router extends PureComponent<object> {

  public render(): ReactNode {

    const { context: { routingState: { history } } } = routerContextManager;

    return (
      <ReactRouter history={history}>

        <Switch>

          <Route exact={true} path={"/authentication/*"} component={AuthorizationModule}/>
          <Route exact={true} path={"/stream/*"} component={StreamModule}/>
          <Route exact={true} path={"*"} component={HomeModule}/>

        </Switch>

      </ReactRouter>
    );
  }

}
