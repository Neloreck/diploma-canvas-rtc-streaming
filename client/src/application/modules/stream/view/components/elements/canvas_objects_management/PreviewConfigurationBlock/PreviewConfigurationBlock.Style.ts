import {createStyles, Theme} from "@material-ui/core/styles";

export const previewConfigurationBlockStyle = (theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.primary.main,
    border: "2px black solid",
    padding: theme.spacing.unit + "px"
  }
});
