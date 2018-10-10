import * as React from "react";
import {PureComponent} from "react";
import {Wrapped} from "redux-cbd";

import {GlobalStoreProvider} from "@Main/data/store";
import {GlobalThemeProvider} from "@Main/view/layouts/theme/GlobalThemeProvider";

import {Router} from "@Main/routing";

/*
 * Decorated root element with providers and layout wrappers.
 */

@Wrapped(GlobalStoreProvider)
@Wrapped(GlobalThemeProvider)
export class Module extends PureComponent {

  public render(): JSX.Element {
    return <Router/>;
  }

}
