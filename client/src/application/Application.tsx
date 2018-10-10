import * as React from "react";
import {render} from "react-dom";
import {EntryPoint} from "redux-cbd";

import "@Main/assets/style/global.scss";
import "reflect-metadata";
import "typeface-roboto";

import {MainModule} from "@Module";

@EntryPoint
export class Application {

  public static main(): void {
    render(<MainModule/>, document.getElementById("application-root"));
  }

}
