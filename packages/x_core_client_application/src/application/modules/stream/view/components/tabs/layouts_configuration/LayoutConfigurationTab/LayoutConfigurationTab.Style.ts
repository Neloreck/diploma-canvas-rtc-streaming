import {createStyles, Theme} from "@material-ui/core/styles";

export const layoutConfigurationTabStyle = (theme: Theme) => createStyles({
  detail: {
    boxSizing: "border-box",
    height: "100%",
    overflowY: "auto",
    width: "75%"
  },
  menu: {
    backgroundColor: theme.palette.background.default,
    boxSizing: "border-box",
    flexGrow: 1,
    height: "100%",
    overflowY: "auto",
    padding: theme.spacing.unit
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    boxSizing: "border-box",
    height: "100%",
    maxHeight: "100%",
    overflowY: "auto",
    padding: theme.spacing.unit,
    position: "absolute"
  }
});
