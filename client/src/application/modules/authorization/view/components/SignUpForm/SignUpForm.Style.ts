import {createStyles, Theme} from "@material-ui/core";

export const signUpFormStyle = (theme: Theme) => createStyles({
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
    backgroundColor: theme.palette.background.default,
    minWidth: theme.spacing.unit * 50,
    width: theme.spacing.unit * 50
  },
  signUnButton: {
    marginTop: theme.spacing.unit
  },
  textInput: {
    width: "100%"
  }
});
