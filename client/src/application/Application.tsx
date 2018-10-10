import * as React from "react";
import {render} from "react-dom";
import {EntryPoint} from "redux-cbd";

import {ApplicationRouter} from "./ApplicationRouter";

/* Import related things into bundle: */

import "@Main/assets/style/global.scss";
import "reflect-metadata";
import "typeface-roboto";

@EntryPoint
export class Application {

  public static main(): void {
    render(<ApplicationRouter/>, document.getElementById("application-root"));
  }

}
