import {createStyles, Theme} from "@material-ui/core/styles";

export const inputSourcesConfigurationButtonStyle = (theme: Theme) => createStyles({
  configureSourceTooltip: {
    height: theme.spacing.unit * 5,
    margin: theme.spacing.unit * 2,
    width: theme.spacing.unit * 5,
  },
  root: {
    alignSelf: "flex-start",
    position: "absolute",
    right: 0
  }
});
