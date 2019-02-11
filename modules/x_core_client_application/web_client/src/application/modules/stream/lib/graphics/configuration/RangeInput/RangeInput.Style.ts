import { createStyles, Theme } from "@material-ui/core/styles";

export const rangeInputStyle = (theme: Theme) => createStyles({
  root: {
    margin: theme.spacing.unit,
    minHeight: theme.spacing.unit * 5.5
  }
});
