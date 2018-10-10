import * as React from "react";
import {PureComponent} from "react";
import {Wrapped} from "redux-cbd";

import {Logger} from "@Lib/util/logger";

import {StreamStoreProvider} from "@Module/stream/data/store";
import {Router} from "@Module/stream/view/routing/Router";

@Wrapped(StreamStoreProvider)
export class Module extends PureComponent {

  private log: Logger = new Logger("[SM]");

  public componentDidMount(): void {
    this.log.info("Module 'stream' has been mounted.");
  }

  public render(): JSX.Element {
    return <Router/>;
  }

}
