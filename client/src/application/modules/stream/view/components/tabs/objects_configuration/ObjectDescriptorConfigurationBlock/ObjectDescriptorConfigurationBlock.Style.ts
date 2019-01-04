import {createStyles, Theme} from "@material-ui/core/styles";

export const objectDescriptorConfigurationBlockStyle = (theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.type === "light" ? theme.palette.secondary.light : theme.palette.secondary.dark,
    borderRadius: theme.spacing.unit,
    height: "100%",
    minWidth: theme.spacing.unit * 33,
    overflowY: "auto",
    padding: theme.spacing.unit * 2,
    position: "relative"
  }
});
