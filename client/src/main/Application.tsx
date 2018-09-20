import * as React from "react";
import {render} from "react-dom";

import {Single} from "@Lib/annotate";

import {globalStoreManager, GlobalStoreProvider} from "@Main/data/store";
import {Root} from "@Main/view/Root";

@Single
export class Application {

  // Directly combine view and data modules.
  public render(): void {
    render(<GlobalStoreProvider store={globalStoreManager.getStore()}>
        <Root/>
      </GlobalStoreProvider>,
      document.getElementById("application-root")
    );
  }

}
