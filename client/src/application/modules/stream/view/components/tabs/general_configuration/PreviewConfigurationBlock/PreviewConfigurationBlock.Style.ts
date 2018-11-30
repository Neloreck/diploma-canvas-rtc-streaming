import {createStyles, Theme} from "@material-ui/core/styles";

export const previewConfigurationBlockStyle = (theme: Theme) => createStyles({
  configItem: {
    minHeight: theme.spacing.unit * 6
  },
  heading: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      borderRadius: theme.spacing.unit
    },
    cursor: "pointer",
    padding: `0 ${theme.spacing.unit * 2}px`
  },
  root: {
    "& label": {
      width: theme.spacing.unit * 30,
    },
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  }
});
