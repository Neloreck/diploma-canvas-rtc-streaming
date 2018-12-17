import {Provide} from "@redux-cbd/context";
import {Wrapped} from "@redux-cbd/utils";
import * as React from "react";
import {PureComponent, ReactNode} from "react";

// Data.
import {authContextManager, routerContextManager, themeContextManager} from "@Main/data/store";

// View.
import {GlobalThemeProvider} from "@Main/view/layouts/GlobalThemeProvider";

// Props.
export interface IGlobalContextProviderProps {}

/* Global store provision. */
@Provide(authContextManager)
@Provide(routerContextManager)
@Provide(themeContextManager)

/* Sync router store with router and context with theme provision. */
@Wrapped(GlobalThemeProvider)
export class GlobalContextProvider extends PureComponent<IGlobalContextProviderProps> {

  public render(): ReactNode {
    return this.props.children;
  }

}
