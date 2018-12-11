import {EntryPoint} from "@redux-cbd/utils";
import * as React from "react";
import {render} from "react-dom";

import {ApplicationRouter} from "./ApplicationRouter";

/* Resources and global-scope imports: */

import "@Main/view/assets/style/global.scss";
import "typeface-roboto";

@EntryPoint()
export class Application {

  public static main(): void {
    render(<ApplicationRouter {...{} as any}/>, document.getElementById("application-root"));
  }

}
