import {createStyles, Theme} from "@material-ui/core/styles";

export const canvasObjectDescriptorConfigurationMenuStyle = (theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.secondary.light,
    borderLeft: "2px solid " + theme.palette.secondary.dark,
    borderRight: "2px solid " + theme.palette.secondary.dark,
    height: "100%",
    minWidth: theme.spacing.unit * 24,
    overflowY: "auto",
    padding: theme.spacing.unit,
  }
});
