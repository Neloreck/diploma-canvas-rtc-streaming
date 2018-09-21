import * as React from "react";
import {PureComponent} from "react";

import {Router} from "@Module/stream/view/routing/Router";

export class Root extends PureComponent {

  public render(): JSX.Element {
    return (
      <Router/>
    );
  }

}
