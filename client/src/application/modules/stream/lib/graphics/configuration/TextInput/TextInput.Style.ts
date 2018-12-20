import {createStyles, Theme} from "@material-ui/core/styles";

export const textInputStyle = (theme: Theme) => createStyles({
  button: {},
  root: {
    "& > div": {
      alignItems: "center",
      display: "flex",
      justifyContent: "center"
    },
    margin: theme.spacing.unit,
    minHeight: theme.spacing.unit * 5.5
  },
  textInput: {
    width: "100%"
  },
});
