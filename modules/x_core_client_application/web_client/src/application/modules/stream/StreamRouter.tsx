import { Provide } from "@redux-cbd/context";
import * as React from "react";
import { ComponentClass, Fragment, PureComponent, ReactNode } from "react";
import { Route, Switch } from "react-router";

// View.
import { IPrivateRouteExternalProps, PrivateRoute } from "@Main/view/layouts/PrivateRoute";
import { ErrorPage } from "@Main/view/pages/ErrorPage";
import { lazyLoadComponentFactory } from "@Main/view/utils";
import {
  bookmarkContextManager,
  graphicsContextManager,
  liveContextManager,
  renderingContextManager,
  sourceContextManager
} from "@Module/stream/data/store";

// Stream routes.
const StreamingPage: ComponentClass = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "stream@streaming-page" */"@Module/stream/view/pages/StreamingPage"));
const StreamCreationPage: ComponentClass = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "stream@stream-creation-page" */"@Module/stream/view/pages/StreamCreationPage"));
const StreamConfigurationPage: ComponentClass = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "stream@stream-config-page" */"@Module/stream/view/pages/StreamConfigurationPage"));
const StreamStatsPage: ComponentClass = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "stream@stream-finished-page" */"@Module/stream/view/pages/StreamStatsPage"));

@Provide(graphicsContextManager, liveContextManager, renderingContextManager, sourceContextManager, bookmarkContextManager)
export class StreamRouter extends PureComponent {

  private readonly prefix: string = "/stream";

  public render(): ReactNode {

    return (
      <Fragment>

        <Switch>

          <PrivateRoute
            exact={true}
            redirect={true}
            path={`${this.prefix}/create`}
            component={StreamCreationPage}
            {...{} as IPrivateRouteExternalProps}
          />

          <PrivateRoute
            exact={true}
            redirect={true}
            path={`${this.prefix}/live/:id`}
            component={StreamingPage}
            {...{} as IPrivateRouteExternalProps}
          />

          <PrivateRoute
            exact={true}
            redirect={true}
            path={`${this.prefix}/configure/:id`}
            component={StreamConfigurationPage}
            {...{} as IPrivateRouteExternalProps}
          />

          <PrivateRoute
            exact={true}
            redirect={true}
            path={`${this.prefix}/stats/:id`}
            component={StreamStatsPage}
            {...{} as IPrivateRouteExternalProps}
          />

          <Route
            exact={true}
            path={"*"}
            component={ErrorPage}
          />

        </Switch>

      </Fragment>
    );
  }

}
