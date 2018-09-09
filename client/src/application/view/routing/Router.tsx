import * as React from "react";
import {PureComponent} from "react";
import {Route} from "react-router";
import {Switch} from "react-router-dom";
import {ConnectedRouter} from "react-router-redux";

import {lazyLoadComponentFactory} from "@App/data/lib/react";
import {reduxStoreManager} from "@Redux";

const HomePage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "home" */"@Containers/pages/HomePage"));
const SignInPage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "sign-in" */"@Containers/pages/SignInPage"));
const SignUpPage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "sign-up" */"@Containers/pages/SignUpPage"));
const ErrorPage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "error-page" */"@Containers/pages/ErrorPage"));

export class Router extends PureComponent {

  public render(): JSX.Element {
    return (
      <ConnectedRouter history={reduxStoreManager.getBrowserHistory()}>

        <Switch>
          <Route exact={true} path={"/"} component={HomePage}/>
          <Route exact={true} path={"/home"} component={HomePage}/>
          <Route exact={true} path={"/signIn"} component={SignInPage}/>
          <Route exact={true} path={"/signUp"} component={SignUpPage}/>
          <Route exact={true} path={"*"} component={ErrorPage}/>
        </Switch>

      </ConnectedRouter>
    );
  }

}
