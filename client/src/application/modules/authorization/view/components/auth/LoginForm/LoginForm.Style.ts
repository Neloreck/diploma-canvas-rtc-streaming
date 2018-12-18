import {createStyles, Theme} from "@material-ui/core";

export const loginFormStyle = (theme: Theme) => createStyles({
  errorLabel: {
    color: theme.palette.text.hint
  },
  formWrapper: {
    padding: "1rem 2rem"
  },
  linearLoader: {
    backgroundColor: theme.palette.primary.light,
    height: 10,
  },
  root: {
    backgroundColor: theme.palette.type === "light" ? theme.palette.secondary.light : theme.palette.secondary.dark,
    width: 350
  },
  signInButton: {
    marginTop: 4
  },
  textInput: {
    width: "100%"
  }
});
