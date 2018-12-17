import * as React from "react";
import {Fragment, PureComponent, ReactNode} from "react";
import {Route, Switch} from "react-router";

// Lib.
import {lazyLoadComponentFactory} from "@Lib/react_lib/lazy_load";

// View.
import {ErrorPage} from "@Main/view/pages/ErrorPage";

/* Stream routes: */

const HomePage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "home@home-page" */"@Module/home/view/pages/HomePage"));

export class ModuleRouter extends PureComponent {

  private static MODULE_PREFIX: string = "/home";

  public render(): ReactNode {

    return (
      <Fragment>

        <Switch>

          <Route exact={true} path={`/`} component={HomePage}/>
          <Route exact={true} path={`${ModuleRouter.MODULE_PREFIX}`} component={HomePage}/>

          <Route exact={true} path={"*"} component={ErrorPage}/>

        </Switch>

      </Fragment>
    );
  }

}
