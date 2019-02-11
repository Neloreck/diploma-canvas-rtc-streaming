import { createStyles, Theme } from "@material-ui/core/styles";

export const videoControlButtonStyle = (theme: Theme) => createStyles({
  root: {
    alignSelf: "flex-start",
    bottom: 0,
    height: theme.spacing.unit * 4.5,
    margin: theme.spacing.unit * 2.5,
    marginLeft: -theme.spacing.unit * 3.5,
    position: "absolute",
    width: theme.spacing.unit * 4.5,
    zIndex: 5
  }
});
