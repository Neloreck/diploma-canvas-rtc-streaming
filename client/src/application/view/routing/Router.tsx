import * as React from "react";
import {PureComponent} from "react";
import {Route} from "react-router";
import {Switch} from "react-router-dom";
import {ConnectedRouter} from "react-router-redux";

import {reduxStoreManager} from "@App/data/redux";

import {HomePage} from "@App/view/containers/HomePage";

export class Router extends PureComponent {

  public render(): JSX.Element {
    return (
      <ConnectedRouter history={reduxStoreManager.getBrowserHistory()}>

        <Switch>
          <Route exact={true} path={"/"} component={HomePage}/>
          <Route exact={true} path={"/home"} component={HomePage}/>

          <Route exact={true} path={"*"} component={null}/>
        </Switch>

      </ConnectedRouter>
    );
  }

}
