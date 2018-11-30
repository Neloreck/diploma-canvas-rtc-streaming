import {createStyles, Theme} from "@material-ui/core/styles";

export const streamingHelpButtonStyle = (theme: Theme) => createStyles({
  helpTooltip: {
    height: theme.spacing.unit * 5,
    margin: theme.spacing.unit * 2,
    width: theme.spacing.unit * 5
  },
  root: {
    left: 0,
    position: "absolute",
    top: theme.spacing.unit * 6
  }
});
