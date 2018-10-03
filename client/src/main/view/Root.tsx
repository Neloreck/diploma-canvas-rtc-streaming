import * as React from "react";
import {PureComponent} from "react";

import {withWrapper} from "@Lib/annotate";

import {GlobalThemeProvider} from "@Main/view/layouts/utils/GlobalThemeProvider";
import {Router} from "@Main/view/routing";

/*
 * Decorated root element with providers and layout wrappers.
 */

@withWrapper(GlobalThemeProvider)
export class Root extends PureComponent {

  public render(): JSX.Element {
    return <Router/>;
  }

}
