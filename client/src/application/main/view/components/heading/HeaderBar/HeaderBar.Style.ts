import {Theme} from "@material-ui/core";
import {createStyles} from "@material-ui/core/styles";

export const headerBarStyle = (theme: Theme) => createStyles({
  liveIcon: {
    margin: "-5px 0 0 5px"
  },
  rightBar: {
    "& > button": {
      margin: `${0} ${theme.spacing.unit}px`,
    },
    flexGrow: 1,
    padding: theme.spacing.unit,
    position: "relative"
  },
  root: {
    backgroundColor: theme.palette.background.default,
    width: "100%"
  },
});
