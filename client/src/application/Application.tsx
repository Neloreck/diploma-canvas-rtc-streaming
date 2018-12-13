import {EntryPoint} from "@redux-cbd/utils";
import * as React from "react";
import {render} from "react-dom";

import {ApplicationRouter} from "./ApplicationRouter";

import {authClient} from "@Api/x-core";
import {DocumentStoreUtils} from "@Lib/utils";
import {authContextManager} from "@Main/data/store";
// @ts-ignore
window.d = DocumentStoreUtils;
// @ts-ignore
window.t = authClient;
// @ts-ignore
window.z = authContextManager;

/* Resources and global-scope imports: */

import "@Main/view/assets/style/global.scss";
import "typeface-roboto";

@EntryPoint()
export class Application {

  public static main(): void {
    render(<ApplicationRouter {...{} as any}/>, document.getElementById("application-root"));
  }

}
