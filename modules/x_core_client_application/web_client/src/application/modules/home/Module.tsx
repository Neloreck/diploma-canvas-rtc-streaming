import * as React from "react";
import {PureComponent, ReactNode} from "react";

// Liv.
import {log} from "@Lib/utils";

// View.
import {ModuleRouter} from "@Module/home/ModuleRouter";

export class Module extends PureComponent {

  public componentDidMount(): void {
    log.info("*** Module 'HOME' has been mounted.");
  }

  public render(): ReactNode {
    return <ModuleRouter/>;
  }

}