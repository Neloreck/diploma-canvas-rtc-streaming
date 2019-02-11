import * as React from "react";
import { ComponentClass, Fragment, PureComponent, ReactNode } from "react";
import { Route, Switch } from "react-router";

// View.
import { ErrorPage } from "@Main/view/pages/ErrorPage";
import { lazyLoadComponentFactory } from "@Main/view/utils";

// Home routes.
const HomePage: ComponentClass = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "home@home-page" */"@Module/home/view/pages/HomePage"));

export class HomeRouter extends PureComponent {

  private readonly prefix: string = "/home";

  public render(): ReactNode {

    return (
      <Fragment>

        <Switch>

          <Route
            exact={true}
            path={`/`}
            component={HomePage}
          />

          <Route
            exact={true}
            path={`${this.prefix}`}
            component={HomePage}
          />

          <Route
            exact={true}
            path={"*"}
            component={ErrorPage}
          />

        </Switch>

      </Fragment>
    );
  }

}
