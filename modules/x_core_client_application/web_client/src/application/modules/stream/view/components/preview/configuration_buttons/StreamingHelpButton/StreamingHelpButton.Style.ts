import { createStyles, Theme } from "@material-ui/core/styles";

export const streamingHelpButtonStyle = (theme: Theme) => createStyles({
  root: {
    bottom: 0,
    height: theme.spacing.unit * 5,
    margin: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2.5,
    position: "absolute",
    right: 0,
    width: theme.spacing.unit * 5
  }
});
