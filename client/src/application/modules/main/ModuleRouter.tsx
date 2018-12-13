import * as React from "react";
import {PureComponent, ReactNode} from "react";
import {Route} from "react-router";
import {Switch} from "react-router-dom";

// Lib.
import {lazyLoadComponentFactory} from "@Lib/react_lib/lazy_load";

// Main routes.
import {ErrorPage} from "@Main/view/pages/ErrorPage";

const HomePage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "main@home-page" */"modules/main/view/pages/HomePage"));
const LoginPage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "main@login-page" */"modules/main/view/pages/LoginPage"));
const SignUpPage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "main@sign-up-page" */"modules/main/view/pages/SignUpPage"));

export class ModuleRouter extends PureComponent {

  public render(): ReactNode {
    return (
        <Switch>

          <Route exact={true} path={"/"} component={HomePage}/>
          <Route exact={true} path={"/home"} component={HomePage}/>
          <Route exact={true} path={"/login"} component={LoginPage}/>
          <Route exact={true} path={"/signUp"} component={SignUpPage}/>

          <Route component={ErrorPage}/>

        </Switch>
    );
  }

}
