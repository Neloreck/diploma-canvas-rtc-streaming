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
            dark: "#373737",
            light: "#8e8e8e",
            main: "#616161"
          },
          secondary: {
            contrastText: "#000000",
            dark: "#aeaeae",
            light: "#ffffff",
            main: "#e0e0e0"
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
