import * as React from "react";
import {Fragment, PureComponent, ReactNode} from "react";
import {Route, Switch} from "react-router";

// Lib.
import {lazyLoadComponentFactory} from "@Lib/react_lib/lazy_load";

// View.
import {ErrorPage} from "@Main/view/pages/ErrorPage";

/* Stream routes: */

const StreamingPage = lazyLoadComponentFactory.getComponent(() => import(/* webpackChunkName: "stream@stream-configuration-page" */"@Module/stream/view/pages/StreamingPage"));

export class ModuleRouter extends PureComponent {

  private static MODULE_PREFIX: string = "/stream";

  public render(): ReactNode {

    return (
      <Fragment>

        <Switch>

          <Route exact={true} path={`${ModuleRouter.MODULE_PREFIX}/`} component={StreamingPage}/>
          <Route exact={true} path={"*"} component={ErrorPage}/>

        </Switch>

      </Fragment>
    );
  }

}
