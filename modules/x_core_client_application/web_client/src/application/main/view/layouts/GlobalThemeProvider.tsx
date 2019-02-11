import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { Consume } from "@redux-cbd/context";
import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Data.
import { IThemeContext, themeContextManager } from "@Main/data/store";

// Props.
export interface IGlobalThemeProviderProps extends IThemeContext {}

@Consume(themeContextManager)
export class GlobalThemeProvider extends PureComponent<IGlobalThemeProviderProps> {

  public render(): ReactNode {
    return (
      <MuiThemeProvider theme={createMuiTheme(this.props.themeState.options)}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }

}
