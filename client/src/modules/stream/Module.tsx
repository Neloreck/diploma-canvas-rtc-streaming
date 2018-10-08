import * as React from "react";
import {PureComponent} from "react";

import {StreamStoreProvider} from "@Module/stream/data/store";

import {Logger} from "@Main/data/utils";

import {Root} from "@Module/stream/view/Root";

export class Module extends PureComponent {

  private log: Logger = new Logger("[SM]");

  public componentDidMount(): void {
    this.log.info("Module mounted.");
  }

  public render(): JSX.Element {
    return (
      <StreamStoreProvider>
        <Root/>
      </StreamStoreProvider>
    );
  }

}
