import {createStyles, Theme} from "@material-ui/core/styles";

export const statsTabStyle = (theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.background.paper,
    boxSizing: "border-box",
    padding: theme.spacing.unit,
    position: "absolute"
  }
});
