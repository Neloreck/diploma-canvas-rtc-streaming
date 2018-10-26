import * as React from "react";
import {Fragment, PureComponent} from "react";
import {Wrapped} from "redux-cbd";

import {Route} from "react-router";
import {Switch} from "react-router-dom";
import {ConnectedRouter} from "react-router-redux";

import {lazyLoadComponentFactory} from "@Lib/react_lib/lazy_load";

import {globalStoreManager, GlobalStoreProvider} from "@Main/data/store";

import {GlobalThemeProvider} from "@Main/view/layouts/theme/GlobalThemeProvider";

/* Submodules: */

export const MainModule = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "module@main" */"@Module/main"));
export const StreamModule = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "module@stream" */"@Module/stream"));

/* Router: */

@Wrapped(GlobalStoreProvider)
@Wrapped(GlobalThemeProvider)
@Wrapped(ConnectedRouter, { history: globalStoreManager.getBrowserHistory(), store: globalStoreManager.getStore()})
export class ApplicationRouter extends PureComponent {

  public render(): JSX.Element {
    return (
      <Fragment>

        <Switch>

          <Route exact={true} path={"/stream*"} component={StreamModule}/>
          <Route component={MainModule}/>

        </Switch>

      </Fragment>
    );
  }

}
