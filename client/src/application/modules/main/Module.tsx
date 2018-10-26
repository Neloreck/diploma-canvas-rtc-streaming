import * as React from "react";
import {PureComponent} from "react";

import {log} from "@Lib/util/logger";

import {ModuleRouter} from "@Main/ModuleRouter";

export class Module extends PureComponent {

  public componentDidMount(): void {
    log.info("Module 'main' has been mounted.");
  }

  public render(): JSX.Element {
    return <ModuleRouter/>;
  }

}
