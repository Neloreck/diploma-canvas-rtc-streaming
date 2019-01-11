import * as React from "react";
import {PureComponent, ReactNode} from "react";

// Globals.
import "webrtc-adapter";

// Lib.
import {log} from "@Lib/utils";

// Data.
import {graphicsContextManager, liveContextManager, renderingContextManager, sourceContextManager} from "@Module/stream/data/store";

// View.
import {ModuleRouter} from "@Module/stream/ModuleRouter";

export class Module extends PureComponent {

  public componentDidMount(): void {
    log.info("*** Module 'STREAM' has been mounted into DOM.");
  }

  public componentWillUnmount(): void {
    log.info("*** Module 'STREAM' unmounting.");

    sourceContextManager.dispose();
    graphicsContextManager.dispose();
    liveContextManager.dispose();
    renderingContextManager.dispose();

    log.info("*** Module 'STREAM' unmounted.");
  }

  public render(): ReactNode {
    return <ModuleRouter/>;
  }

}
