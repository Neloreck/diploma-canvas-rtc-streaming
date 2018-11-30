import {createStyles, Theme} from "@material-ui/core/styles";

export const previewStatsBlockStyle = (theme: Theme) => createStyles({
  heading: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      borderRadius: theme.spacing.unit
    },
    cursor: "pointer",
    padding: `0 ${theme.spacing.unit * 2}px`
  },
  root: {
    backgroundColor: theme.palette.secondary.light,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  statBlock: {
    backgroundColor: theme.palette.secondary.main,
    margin: `${theme.spacing.unit}px 0px`,
    padding: theme.spacing.unit
  },
  trackDetail: {
    border: `${theme.spacing.unit / 8}px solid ${theme.palette.secondary.dark}`,
    borderRadius: theme.spacing.unit,
    padding: theme.spacing.unit
  },
});
