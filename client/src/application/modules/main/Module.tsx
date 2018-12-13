import * as React from "react";
import {PureComponent, ReactNode} from "react";

// Liv.
import {log} from "@Lib/utils";

// View.
import {ModuleRouter} from "@Main/ModuleRouter";

export class Module extends PureComponent {

  public componentDidMount(): void {
    log.info("Module 'main' has been mounted.");
  }

  public render(): ReactNode {
    return <ModuleRouter/>;
  }

}
