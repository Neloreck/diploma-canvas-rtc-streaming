import * as React from "react";
import {Fragment, PureComponent, ReactNode} from "react";
import {Route, Switch} from "react-router";

// View.
import {IPrivateRouteExternalProps, PrivateRoute} from "@Main/view/layouts/PrivateRoute";
import {ErrorPage} from "@Main/view/pages/ErrorPage";
import {lazyLoadComponentFactory} from "@Main/view/utils";

/* Stream routes: */

const StreamingPage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "stream@streaming-page" */"@Module/stream/view/pages/StreamingPage"));
const StreamCreationPage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "stream@stream-creation-page" */"@Module/stream/view/pages/StreamCreationPage"));
const StreamConfigurationPage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "stream@stream-configuration-page" */"@Module/stream/view/pages/StreamConfigurationPage"));

export class ModuleRouter extends PureComponent {

  private static MODULE_PREFIX: string = "/stream";

  public render(): ReactNode {

    return (
      <Fragment>

        <Switch>

          <PrivateRoute
            exact={true}
            redirect={`/authorization/login?next=${ModuleRouter.MODULE_PREFIX}/create`}
            path={`${ModuleRouter.MODULE_PREFIX}/create`}
            component={StreamCreationPage}
            {...{} as IPrivateRouteExternalProps}
          />

          <PrivateRoute
            exact={true}
            redirect={`/authorization/login?next=${ModuleRouter.MODULE_PREFIX}/live/:id-todo`}
            path={`${ModuleRouter.MODULE_PREFIX}/live/:id`}
            component={StreamingPage}
            {...{} as IPrivateRouteExternalProps}
          />

          <Route
            exact={true}
            path={`${ModuleRouter.MODULE_PREFIX}/configure/:id`}
            component={StreamConfigurationPage}
          />

          <Route exact={true} path={"*"} component={ErrorPage}/>

        </Switch>

      </Fragment>
    );
  }

}
