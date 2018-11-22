import {ThemeOptions} from "@material-ui/core/styles/createMuiTheme";
import {ReactContextManager} from "@redux-cbd/context";

export interface IThemeContextState {
  themeActions: {};
  themeState: {
    options: ThemeOptions;
  };
}

export class ThemeContext extends ReactContextManager<IThemeContextState> {

  protected state: IThemeContextState = {
    themeActions: {},
    themeState: {
      options: {
        palette: {
          primary: {
            contrastText: "#fff",
            dark: "#21407d",
            light: "#2b71b0",
            main: "#1f5070"
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
