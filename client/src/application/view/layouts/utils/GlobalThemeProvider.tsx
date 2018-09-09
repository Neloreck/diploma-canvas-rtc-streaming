import * as React from "react";
import {PureComponent} from "react";

import {createMuiTheme, MuiThemeProvider, Theme} from "@material-ui/core";

import {withConnection} from "@Annotate";
import {IGlobalStoreState} from "@Redux";

export interface IGlobalThemeProviderStoreProps {
  theme: Theme;
}

@withConnection<IGlobalThemeProviderStoreProps>(
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