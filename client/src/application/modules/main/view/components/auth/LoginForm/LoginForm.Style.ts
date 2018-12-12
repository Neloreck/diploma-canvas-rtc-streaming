import {createStyles, Theme} from "@material-ui/core";

export const loginFormStyle = (theme: Theme) => createStyles({
  formWrapper: {
    padding: "1rem 2rem"
  },
  linearLoader: {
    backgroundColor: theme.palette.primary.light,
    height: 10,
  },
  root: {
    width: "350px"
  },
  signInButton: {
    marginTop: "4px"
  },
  textInput: {
    width: "100%"
  }
});
