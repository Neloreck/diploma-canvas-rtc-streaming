import * as React from "react";
import {PureComponent} from "react";

import {Route} from "react-router";
import {Switch} from "react-router-dom";
import {ConnectedRouter} from "react-router-redux";

import {lazyLoadComponentFactory} from "@Lib/react_lib/lazy_load";
import {globalStoreManager} from "@Main/data/store";

import {ErrorPage} from "@Main/view/containers/pages/ErrorPage";

/* Main routes: */

const HomePage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "main@home-page" */"@Main/view/containers/pages/HomePage"));
const SignInPage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "main@sign-in-page" */"@Main/view/containers/pages/SignInPage"));
const SignUpPage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "main@sign-up-page" */"@Main/view/containers/pages/SignUpPage"));

/* Submodules: */

export const StreamModule = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "module@stream" */"@Module/stream"));

/* Router: */

export class Router extends PureComponent {

  public render(): JSX.Element {
    return (
      <ConnectedRouter
        history={globalStoreManager.getBrowserHistory()}
        store={globalStoreManager.getStore()}
      >

        <Switch>

          <Route exact={true} path={"/"} component={HomePage}/>
          <Route exact={true} path={"/home"} component={HomePage}/>
          <Route exact={true} path={"/signIn"} component={SignInPage}/>
          <Route exact={true} path={"/signUp"} component={SignUpPage}/>

          <Route exact={true} path={"/stream*"} component={StreamModule}/>

          <Route component={ErrorPage}/>

        </Switch>

      </ConnectedRouter>
    );
  }

}
