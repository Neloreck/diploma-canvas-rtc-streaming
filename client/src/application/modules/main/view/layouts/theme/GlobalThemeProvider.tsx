import * as React from "react";
import {PureComponent} from "react";

import {createMuiTheme, MuiThemeProvider, Theme} from "@material-ui/core";

import {GlobalStoreConnect, IGlobalStoreState} from "../../../data/store/index";

export interface IGlobalThemeProviderStoreProps {
  theme: Theme;
}

/*
 * Application theme provider.
 * Same colors and sizing for whole application.
 */

@GlobalStoreConnect<IGlobalThemeProviderStoreProps>(
  (state: IGlobalStoreState) => ({
    theme: createMuiTheme(state.theme.options)
  })
)
export class GlobalThemeProvider extends PureComponent<IGlobalThemeProviderStoreProps> {

  public render(): JSX.Element {
    return (
      <MuiThemeProvider theme={this.props.theme}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }

}
