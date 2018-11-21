import {Consume} from "@redux-cbd/context";
import * as React from "react";
import {PureComponent} from "react";

import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";

import {themeContext} from "@Main/data/store";
import {IThemeContextState} from "@Main/data/store/theme/ThemeContext";

export interface IGlobalThemeProviderProps extends IThemeContextState {}

@Consume<IThemeContextState, IGlobalThemeProviderProps>(themeContext)
export class GlobalThemeProvider extends PureComponent<IGlobalThemeProviderProps> {

  public render(): JSX.Element {
    return (
      <MuiThemeProvider theme={createMuiTheme(this.props.themeState.options)}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }

}
