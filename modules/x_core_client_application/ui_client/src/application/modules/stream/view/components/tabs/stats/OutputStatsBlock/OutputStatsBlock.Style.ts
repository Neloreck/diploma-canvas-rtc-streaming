import {createStyles, Theme} from "@material-ui/core/styles";

export const outputStatsBlockStyle = (theme: Theme) => createStyles({
  heading: {
    "&:hover": {
      backgroundColor: theme.palette.type === "light" ? theme.palette.secondary.light : theme.palette.primary.main
    },
    borderRadius: theme.spacing.unit,
    cursor: "pointer",
    padding: `0 ${theme.spacing.unit * 2}px`,
    transition: "0.75s"
  },
  root: {
    backgroundColor: theme.palette.background.default,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  statBlock: {
    margin: `${theme.spacing.unit}px 0px`,
    padding: theme.spacing.unit
  },
  trackDetail: {
    border: `${theme.spacing.unit / 8}px solid ${theme.palette.secondary.dark}`,
    borderRadius: theme.spacing.unit,
    padding: theme.spacing.unit
  },
});
