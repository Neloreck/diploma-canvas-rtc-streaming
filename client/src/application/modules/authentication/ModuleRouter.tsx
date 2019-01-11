import * as React from "react";
import {PureComponent, ReactNode} from "react";
import {Route} from "react-router";
import {Switch} from "react-router-dom";

// View.
import {IPrivateRouteExternalProps, PrivateRoute} from "@Main/view/layouts/PrivateRoute";
import {lazyLoadComponentFactory} from "@Main/view/utils";

// Main routes.

const LoginPage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "authorization@login-page" */"@Module/authentication/view/pages/LoginPage"));
const SignUpPage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "authorization@register-page" */"@Module/authentication/view/pages/SignUpPage"));
const ErrorPage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "main@error-page" */"@Main/view/pages/ErrorPage"));

export class ModuleRouter extends PureComponent {

  private static MODULE_PREFIX: string = "/authentication";

  public render(): ReactNode {
    return (
      <Switch>

        <PrivateRoute exact={true} path={`${ModuleRouter.MODULE_PREFIX}/login`} redirect={"/home"} component={LoginPage} reversed {...{} as IPrivateRouteExternalProps}/>
        <PrivateRoute exact={true} path={`${ModuleRouter.MODULE_PREFIX}/register`} redirect={"/home"} component={SignUpPage} reversed {...{} as IPrivateRouteExternalProps}/>

        <Route exact={true} path={"*"} component={ErrorPage}/>

      </Switch>
    );
  }

}
