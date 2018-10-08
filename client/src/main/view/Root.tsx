import * as React from "react";
import {PureComponent} from "react";
import {Wrapped} from "redux-cbd";

import {GlobalStoreProvider} from "@Main/data/store";
import {GlobalThemeProvider} from "@Main/view/layouts/utils/GlobalThemeProvider";

import {Router} from "@Main/view/routing";

/*
 * Decorated root element with providers and layout wrappers.
 */

@Wrapped(GlobalStoreProvider)
@Wrapped(GlobalThemeProvider)
export class Root extends PureComponent {

  public render(): JSX.Element {
    return <Router/>;
  }

}
