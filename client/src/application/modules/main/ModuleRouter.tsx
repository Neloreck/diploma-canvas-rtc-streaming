import * as React from "react";
import {PureComponent} from "react";

import {Route} from "react-router";
import {Switch} from "react-router-dom";

import {lazyLoadComponentFactory} from "@Lib/react_lib/lazy_load";

/* Main routes: */

import {ErrorPage} from "@Main/view/containers/pages/ErrorPage";

const HomePage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "main@home-page" */"modules/main/view/containers/pages/HomePage/index"));
const SignInPage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "main@sign-in-page" */"modules/main/view/containers/pages/SignInPage/index"));
const SignUpPage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "main@sign-up-page" */"modules/main/view/containers/pages/SignUpPage/index"));

export class ModuleRouter extends PureComponent {

  public render(): JSX.Element {
    return (
        <Switch>

          <Route exact={true} path={"/"} component={HomePage}/>
          <Route exact={true} path={"/home"} component={HomePage}/>
          <Route exact={true} path={"/signIn"} component={SignInPage}/>
          <Route exact={true} path={"/signUp"} component={SignUpPage}/>

          <Route component={ErrorPage}/>

        </Switch>
    );
  }

}
