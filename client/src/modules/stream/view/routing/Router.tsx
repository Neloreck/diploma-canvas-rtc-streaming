import * as React from "react";
import {Fragment, PureComponent} from "react";
import {Route, Switch} from "react-router";

import {lazyLoadComponentFactory} from "@Lib/lazy_load";

const StreamingPage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "stream-streaming-page" */"@Module/stream/view/containers/pages/StreamingPage"));
const ErrorPage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "main-error-page" */"@Main/view/containers/pages/ErrorPage"));

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