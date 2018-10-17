import {createStyles, Theme} from "@material-ui/core/styles";

export const inputSourcesSelectFormStyle = (theme: Theme) => createStyles({
  inputSelectForm: {
    padding: theme.spacing.unit,
    width: "100%"
  },
  root: {
    height: "100%",
    justifyContent: "center",
    width: "100%"
  }
});
