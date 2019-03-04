import { createElement } from "react";
import { render } from "react-dom";

// Resources.
import "@Main/view/assets/style/global.scss";
import "typeface-roboto";

// Application.
import { Router } from "@Application/modules/Router";
import { EntryPoint } from "@Lib/decorators";

@EntryPoint()
export class Application {

  public static main(): void {
    render(createElement(Router), document.getElementById("application-root"));
  }

}
