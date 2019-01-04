import {Theme} from "@material-ui/core";
import {createStyles} from "@material-ui/core/styles";

export const headerBarAuthNavigationStyle = (theme: Theme) => createStyles({
  homeButton: {
    margin: theme.spacing.unit / 2
  },
  logo: {
    cursor: "pointer",
    minWidth: 100
  }
});
