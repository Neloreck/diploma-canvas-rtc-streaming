import {Theme} from "@material-ui/core";
import {createStyles} from "@material-ui/core/styles";

export const headerBarStyle = (theme: Theme) => createStyles({
  logo: {
    cursor: "pointer",
    minWidth: 100
  },
  rightBar: {
    "& > button": {
      margin: `${0} ${theme.spacing.unit}px`,
    },
    flexGrow: 1
  },
  root: {
    width: "100%"
  },
  usernameLabel: {
    cursor: "default"
  }
});
