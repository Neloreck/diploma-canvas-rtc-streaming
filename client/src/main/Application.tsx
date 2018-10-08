import * as React from "react";
import {render} from "react-dom";
import {EntryPoint} from "redux-cbd";

import {Root} from "@Main/view/Root";

import "@Main/assets/style/global.scss";

import "reflect-metadata";
import "typeface-roboto";

@EntryPoint
export class Application {

  public static main(): void {
    render(<Root/>, document.getElementById("application-root"));
  }

}
