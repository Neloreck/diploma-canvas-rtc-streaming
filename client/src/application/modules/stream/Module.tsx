import {Provide} from "@redux-cbd/context";
import * as React from "react";
import {PureComponent} from "react";

// Globals.
// Todo: AdapterJS injection.

// Lib.
import {log} from "@Lib/util/logger";

// Data.
import {graphicsContextManager, sourceContextManager} from "@Module/stream/data/store";

// View.
import {ModuleRouter} from "@Module/stream/ModuleRouter";

@Provide(graphicsContextManager)
@Provide(sourceContextManager)
export class Module extends PureComponent {

  public componentDidMount(): void {
    log.info("Module 'stream' has been mounted into DOM.");
  }

  public render(): JSX.Element {
    return <ModuleRouter/>;
  }

}
