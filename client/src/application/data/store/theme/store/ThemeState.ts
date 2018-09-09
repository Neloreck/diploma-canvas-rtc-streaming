import {ThemeOptions} from "@material-ui/core/styles/createMuiTheme";
import {purple} from "@material-ui/core/colors";

export class ThemeState {

  public readonly options: ThemeOptions = {
    palette: {
      primary: {main: purple[500]},
      secondary: {main: "#4f69cb"}
    }
  };

}
