import * as React from "react";
import {PureComponent} from "react";

import {withWrapper} from "@Annotate";

import {Router} from "@App/view/routing";
import {GlobalThemeProvider} from "@Layouts/utils/GlobalThemeProvider";

@withWrapper(GlobalThemeProvider)
export class Root extends PureComponent {

  public render(): JSX.Element {
    return <Router/>;
  }

}
