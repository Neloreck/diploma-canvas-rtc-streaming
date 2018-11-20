import {ThemeOptions} from "@material-ui/core/styles/createMuiTheme";

export class ThemeState {

  public readonly options: ThemeOptions = {
    palette: {
      primary: {
        contrastText: "#fff",
        dark: "#0d1e2b",
        light: "#2e85b0",
        main: "#1f5070"
      },
      secondary: {
        contrastText: "#ffffff",
        dark: "#7e7e86",
        light: "#cbd4cc",
        main: "#abafaa"
      },
    },
    typography: {
      useNextVariants: true
    }
  };

}
