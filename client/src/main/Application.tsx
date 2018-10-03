import * as React from "react";
import {render} from "react-dom";

import {Single} from "@Lib/annotate";

import {globalStoreManager, GlobalStoreProvider} from "@Main/data/store";
import {Root} from "@Main/view/Root";

/*
 * Application instance that combines data and view.
 */

@Single
export class Application {

  public injectIntoDOM(): void {
    render(this.render(), document.getElementById("application-root"));
  }

  public render(): JSX.Element {
    return (
      <GlobalStoreProvider store={globalStoreManager.getStore()}>

        <Root/>

      </GlobalStoreProvider>
    );
  }

}
