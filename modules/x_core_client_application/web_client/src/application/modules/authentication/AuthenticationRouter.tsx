import * as React from "react";
import { ComponentClass, PureComponent, ReactNode } from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";

// View.
import { IPrivateRouteExternalProps, PrivateRoute } from "@Main/view/layouts/PrivateRoute";
import { lazyLoadComponentFactory } from "@Main/view/utils";

// Auth routes.
const LoginPage: ComponentClass = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "authorization@login-page" */"@Module/authentication/view/pages/LoginPage"));
const SignUpPage: ComponentClass = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "authorization@register-page" */"@Module/authentication/view/pages/SignUpPage"));
const ErrorPage: ComponentClass = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "main@error-page" */"@Main/view/pages/ErrorPage"));

export class AuthenticationRouter extends PureComponent {

  private readonly prefix: string = "/authentication";

  public render(): ReactNode {
    return (
      <Switch>

        <PrivateRoute
          exact={true}
          path={`${this.prefix}/login`}
          redirect={"/home"}
          component={LoginPage}
          reversed {...{} as IPrivateRouteExternalProps}
        />

        <PrivateRoute
          exact={true}
          path={`${this.prefix}/register`}
          redirect={"/home"}
          component={SignUpPage}
          reversed
          {...{} as IPrivateRouteExternalProps}
        />

        <Route
          exact={true}
          path={"*"}
          component={ErrorPage}
        />

      </Switch>
    );
  }

}
