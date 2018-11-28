import {Provide} from "@redux-cbd/context";
import * as React from "react";
import {PureComponent} from "react";

// Globals.
// Todo: AdapterJS injection.

// Lib.
import {log} from "@Lib/util/logger";

// Data.
import {graphicsContextManager, sourceContext} from "@Module/stream/data/store";

// View.
import {ModuleRouter} from "@Module/stream/ModuleRouter";

@Provide(graphicsContextManager)
@Provide(sourceContext)
export class Module extends PureComponent {

  public componentDidMount(): void {
    log.info("Module 'stream' has been mounted into DOM.");
  }

  public render(): JSX.Element {
    return <ModuleRouter/>;
  }

}
