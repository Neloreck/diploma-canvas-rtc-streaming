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
            contrastText: "#fff",
            dark: "#37475c",
            light: "#739cc9",
            main: "#2f6293"
          },
          secondary: {
            contrastText: "#ffffff",
            dark: "#ababb6",
            light: "#e6e6e6",
            main: "#d1d3d6"
          },
        },
        typography: {
          useNextVariants: true
        }
      }
    }
  };

}
