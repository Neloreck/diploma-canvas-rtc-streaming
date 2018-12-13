import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {Consume} from "@redux-cbd/context";
import * as React from "react";
import {PureComponent, ReactNode} from "react";

// Data.
import {themeContextManager} from "@Main/data/store";
import {IThemeContext} from "@Main/data/store/theme/ThemeContextManager";

export interface IGlobalThemeProviderProps extends IThemeContext {}

@Consume<IThemeContext, IGlobalThemeProviderProps>(themeContextManager)
export class GlobalThemeProvider extends PureComponent<IGlobalThemeProviderProps> {

  public render(): ReactNode {
    return (
      <MuiThemeProvider theme={createMuiTheme(this.props.themeState.options)}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }

}
