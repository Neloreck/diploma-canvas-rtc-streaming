import { createStyles, Theme } from "@material-ui/core/styles";

export const streamingHeaderBarStyle = (theme: Theme) => createStyles({
  connectionProgress: {
    marginLeft: theme.spacing.unit / 2
  },
  homeButton: {
    margin: theme.spacing.unit / 2
  },
  logo: {
    cursor: "pointer",
    minWidth: 100
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
  spacer: {
    flexGrow: 1
  },
  startButton: {
  },
  startIcon: {
    margin: "-5px 0 0 5px"
  },
  toolBar: {
  },
  usernameLabel: {
    cursor: "default"
  }
});
