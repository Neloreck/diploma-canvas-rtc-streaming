import {ThemeOptions} from "@material-ui/core/styles/createMuiTheme";
import {ReactContextManager} from "@redux-cbd/context";

export interface IThemeContext {
  themeActions: {};
  themeState: {
    options: ThemeOptions;
  };
}

export class ThemeContextManager extends ReactContextManager<IThemeContext> {

  protected context: IThemeContext = {
    themeActions: {},
    themeState: {
      options: {
        palette: {
          primary: {
            contrastText: "#ffffff",
            dark: "#394f67",
            light: "#6689b0",
            main: "#415c7a"
          },
          secondary: {
            contrastText: "#000000",
            dark: "#707070",
            light: "#ffffff",
            main: "#c2c2c2"
          },
          type: "dark"
        },
        typography: {
          useNextVariants: true
        }
      }
    }
  };

}
