import * as React from "react";
import {PureComponent} from "react";
import {Wrapped} from "redux-cbd";

import {log} from "@Lib/util/logger";

import {StreamStoreProvider} from "@Module/stream/data/store";
import {ModuleRouter} from "@Module/stream/ModuleRouter";

@Wrapped(StreamStoreProvider)
export class Module extends PureComponent {

  public componentDidMount(): void {
    log.info("Module 'stream' has been mounted into DOM.");
  }

  public render(): JSX.Element {
    return <ModuleRouter/>;
  }

}
