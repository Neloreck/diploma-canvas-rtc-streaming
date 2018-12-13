import {EntryPoint} from "@redux-cbd/utils";
import * as React from "react";
import {render} from "react-dom";

/* Resources and global-scope imports: */

import "@Main/view/assets/style/global.scss";
import "typeface-roboto";

/* Modules injector. */

import {ModulesRouter} from "@Module/ModulesRouter";

@EntryPoint()
export class Application {

  public static main(): void {
    render(<ModulesRouter {...{} as any}/>, document.getElementById("application-root"));
  }

}
