import {createStyles, Theme} from "@material-ui/core/styles";

export const previewStatsBlockStyle = (theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.secondary.light,
    boxShadow: `2px 2px 8px 1px ${theme.palette.secondary.dark}`,
    marginTop: theme.spacing.unit * 2,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  }
});
