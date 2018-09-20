import {createStyles, Theme} from "@material-ui/core/styles";

export const signInPageStyle = (theme: Theme) => createStyles({
  content: {
    flexGrow: 24,
    width: "100%"
  },
  root: {
    backgroundColor: theme.palette.secondary.light
  }
});
