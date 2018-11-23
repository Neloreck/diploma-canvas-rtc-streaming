import {Consume, Provide} from "@redux-cbd/context";
import {Wrapped} from "@redux-cbd/utils";
import * as React from "react";
import {PureComponent} from "react";
import {Route, Router} from "react-router";
import {Switch} from "react-router-dom";

import {lazyLoadComponentFactory} from "@Lib/react_lib/lazy_load";

import {authContextManager, IRouterContext, routerContextManager, themeContextManager} from "@Main/data/store";

import {GlobalThemeProvider, IGlobalThemeProviderProps} from "@Main/view/layouts/GlobalThemeProvider";

/* Submodules: */

export const MainModule = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "module@main" */"@Module/main"));
export const StreamModule = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "module@stream" */"@Module/stream"));

/* Router: */

export interface IApplicationRouterProps extends IRouterContext, IGlobalThemeProviderProps {}

@Provide(authContextManager)
@Provide(routerContextManager)
@Provide(themeContextManager)

@Consume<IRouterContext, IApplicationRouterProps>(routerContextManager)
@Wrapped<IGlobalThemeProviderProps, IApplicationRouterProps>(GlobalThemeProvider)
export class ApplicationRouter extends PureComponent<IApplicationRouterProps> {

  public render(): JSX.Element {
    const {routingState: {history}} = this.props;

    return (
      <Router history={history}>

        <Switch>

          <Route exact={true} path={"/stream*"} component={StreamModule}/>
          <Route component={MainModule}/>

        </Switch>

      </Router>
    );
  }

}
