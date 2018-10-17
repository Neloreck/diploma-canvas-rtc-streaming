import {ThemeOptions} from "@material-ui/core/styles/createMuiTheme";

export class ThemeState {

  public readonly options: ThemeOptions = {
    palette: {
      primary: {
        contrastText: "#fff",
        dark: "#102027",
        light: "#62727b",
        main: "#37474f"
      },
      secondary: {
        contrastText: "#ffffff",
        dark: "#004c57",
        light: "#e0e9ee",
        main: "#007884"
      },
    },
    typography: {
      useNextVariants: true
    }
  };

}
