import {Provide} from "@redux-cbd/context";
import * as React from "react";
import {PureComponent, ReactNode} from "react";

// Globals.
// Todo: AdapterJS injection.

// Lib.
import {log} from "@Lib/utils";

// Data.
import {graphicsContextManager, renderingContextManager, sourceContextManager} from "@Module/stream/data/store";

// View.
import {ModuleRouter} from "@Module/stream/ModuleRouter";

@Provide(graphicsContextManager)
@Provide(renderingContextManager)
@Provide(sourceContextManager)
export class Module extends PureComponent {

  public componentDidMount(): void {
    log.info("Module 'STREAM' has been mounted into DOM.");
  }

  public componentWillUnmount(): void {
    log.info("Module 'STREAM' disposing.");

    sourceContextManager.dispose();
    graphicsContextManager.dispose();
  }

  public render(): ReactNode {
    return <ModuleRouter/>;
  }

}
