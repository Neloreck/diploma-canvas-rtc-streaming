import {createStyles, Theme} from "@material-ui/core/styles";

export const objectAdditionButtonStyle = (theme: Theme) => createStyles({
  additionButton: {
    height: theme.spacing.unit * 5,
    margin: theme.spacing.unit * 2,
    width: theme.spacing.unit * 5,
  },
  root: {
    alignSelf: "flex-start",
    left: 0,
    position: "absolute",
    top: theme.spacing.unit * 6
  },
  rootEmpty: {
    alignSelf: "flex-start",
    left: 0,
    position: "absolute",
    top: theme.spacing.unit * 6,
    width: 0
  }
});
