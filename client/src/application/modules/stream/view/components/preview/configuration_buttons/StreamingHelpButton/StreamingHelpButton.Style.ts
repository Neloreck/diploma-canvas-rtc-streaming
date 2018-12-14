import {createStyles, Theme} from "@material-ui/core/styles";

export const streamingHelpButtonStyle = (theme: Theme) => createStyles({
  helpTooltip: {
    height: theme.spacing.unit * 5,
    margin: theme.spacing.unit * 2,
    width: theme.spacing.unit * 5
  },
  root: {
    position: "absolute",
    right: 0,
    top: theme.spacing.unit * 6
  }
});
