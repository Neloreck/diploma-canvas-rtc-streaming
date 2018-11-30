import {createStyles, Theme} from "@material-ui/core";

export const mainPreviewTabsStyle = (theme: Theme) => createStyles({
  resizer: {
    backgroundColor: theme.palette.primary.dark,
    height: theme.spacing.unit / 2
  },
  root: {
    height: "40vh",
    minHeight: theme.spacing.unit * 7,
    position: "relative",
    transition: "all 100ms ease-out 0s"
  },
  tabContent: {
    backgroundColor: theme.palette.secondary.light,
    flexGrow: 1,
    maxHeight: "100%",
    overflowY: "auto",
    position: "relative"
  }
});
