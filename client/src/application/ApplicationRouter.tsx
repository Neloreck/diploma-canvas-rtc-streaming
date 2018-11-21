import {Consume, Provide} from "@redux-cbd/context";
import {Wrapped} from "@redux-cbd/utils";
import * as React from "react";
import {PureComponent} from "react";
import {Route, Router} from "react-router";
import {Switch} from "react-router-dom";

import {lazyLoadComponentFactory} from "@Lib/react_lib/lazy_load";

import {authContext, IRouterContextState, routerContext, themeContext} from "@Main/data/store";

import {GlobalThemeProvider, IGlobalThemeProviderProps} from "@Main/view/layouts/GlobalThemeProvider";

/* Submodules: */

export const MainModule = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "module@main" */"@Module/main"));
export const StreamModule = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "module@stream" */"@Module/stream"));

/* Router: */

@Provide(authContext)
@Provide(routerContext)
@Provide(themeContext)

@Consume<IRouterContextState, IRouterContextState>(routerContext)
@Wrapped<IGlobalThemeProviderProps, IRouterContextState>(GlobalThemeProvider)
export class ApplicationRouter extends PureComponent<IRouterContextState> {

  public render(): JSX.Element {
    return (
      <Router history={this.props.routingState.history}>

        <Switch>

          <Route exact={true} path={"/stream*"} component={StreamModule}/>
          <Route component={MainModule}/>

        </Switch>

      </Router>
    );
  }

}
