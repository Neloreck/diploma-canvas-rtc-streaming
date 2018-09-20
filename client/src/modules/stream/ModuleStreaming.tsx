import * as React from "react";
import {PureComponent} from "react";

import {streamStoreManager, StreamStoreProvider} from "@Module/stream/data/store";
import {Root} from "@Module/stream/view/Root";

export class ModuleStreaming extends PureComponent {

  public render(): JSX.Element {
    return (
      <StreamStoreProvider store={streamStoreManager.getStore()}>
        <Root/>
      </StreamStoreProvider>
    );
  }

}
