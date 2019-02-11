import { createStyles, Theme } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";

export const loginFormStyle = (theme: Theme) => createStyles({
  errorLabel: {
    color: theme.palette.text.hint
  },
  formWrapper: {
    "& > form": {
      width: "100%"
    },
    padding: theme.spacing.unit * 2
  },
  linearLoader: {
    backgroundColor: theme.palette.primary.light,
    height: 10,
  },
  root: {
    backgroundColor: theme.palette.type === "light" ? theme.palette.secondary.light : fade(theme.palette.background.default, 0.9),
    width: 350
  },
  signInButton: {
    marginTop: 4
  },
  textInput: {
    width: "100%"
  }
});
