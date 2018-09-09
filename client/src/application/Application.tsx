import * as React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";

import {Single} from "@Annotate";
import {reduxStoreManager} from "@Redux";

import {Root} from "@App/view/Root";

@Single
export class Application {

  // Directly combine view and data modules.
  public render(): void {
    render(<Provider store={reduxStoreManager.getGlobalStore()}>
        <Root/>
      </Provider>,
      document.getElementById("application-root")
    );
  }

}
