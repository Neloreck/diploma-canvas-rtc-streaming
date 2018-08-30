import * as React from "react";
import {PureComponent} from "react";

import {Router} from "@App/view/routing/Router";

export class Application extends PureComponent {

  public render(): JSX.Element {
    return <Router/>;
  }

}
