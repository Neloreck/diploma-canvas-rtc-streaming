import * as React from "react";
import {Fragment, PureComponent} from "react";
import {Route, Switch} from "react-router";

import {lazyLoadComponentFactory} from "@Lib/react_lib/lazy_load";

import {ErrorPage} from "@Main/view/containers/pages/ErrorPage";

/* Stream routes: */

const StreamConfigurationPage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "stream@stream-configuration-page" */"@Module/stream/view/containers/StreamConfigurationPage"));

export class ModuleRouter extends PureComponent {

  private static MODULE_PREFIX: string = "/stream";

  public render(): JSX.Element {

    return (
      <Fragment>

        <Switch>

          <Route exact={true} path={`${ModuleRouter.MODULE_PREFIX}`} component={StreamConfigurationPage}/>
          <Route exact={true} path={`${ModuleRouter.MODULE_PREFIX}/test`} component={StreamConfigurationPage}/>
          <Route exact={true} path={"*"} component={ErrorPage}/>

        </Switch>

      </Fragment>
    );
  }

}
