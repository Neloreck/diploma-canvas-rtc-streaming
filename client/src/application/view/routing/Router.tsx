import {createBrowserHistory} from "history";
import * as React from "react";
import {PureComponent} from "react";
import {Route, Router as ReactRouter} from "react-router";
import {Switch} from "react-router-dom";

export class Router extends PureComponent {

  public render(): JSX.Element {
    return (
      <ReactRouter history={createBrowserHistory()}>
        <Switch>

          <Route exact={true} path={"/temp"} component={null}/>
          <Route exact={true} path={"*"} component={null}/>

        </Switch>
      </ReactRouter>
    );
  }

}
