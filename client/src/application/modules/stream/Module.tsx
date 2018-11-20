import {Provide} from "@redux-cbd/context";
import * as React from "react";
import {PureComponent} from "react";

import {log} from "@Lib/util/logger";

import {graphicsContext, sourceContext} from "@Module/stream/data/store";
import {ModuleRouter} from "@Module/stream/ModuleRouter";

@Provide(graphicsContext)
@Provide(sourceContext)
export class Module extends PureComponent {

  public componentDidMount(): void {
    log.info("Module 'stream' has been mounted into DOM.");
  }

  public render(): JSX.Element {
    return <ModuleRouter/>;
  }

}
