import * as React from "react";
import {Fragment, PureComponent} from "react";
import {Route, Switch} from "react-router";

import {lazyLoadComponentFactory} from "@Lib/lazy_load";

import {ErrorPage} from "@Main/view/containers/pages/ErrorPage";

const StreamingPage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "stream-streaming-page" */"@Module/stream/view/containers/pages/StreamingPage"));

export class Router extends PureComponent {

  public render(): JSX.Element {

    return (
      <Fragment>

        <Switch>

          <Route exact={true} path={"/stream"} component={StreamingPage}/>

          <Route exact={true} path={"*"} component={ErrorPage}/>

        </Switch>

      </Fragment>
    );
  }

}
