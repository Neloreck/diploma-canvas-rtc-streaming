import {createStyles, Theme} from "@material-ui/core/styles";

export const previewConfigurationBlockStyle = (theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: `1px 1px 1px 0 ${theme.palette.primary.dark}`,
    padding: theme.spacing.unit * 2 + "px"
  }
});
