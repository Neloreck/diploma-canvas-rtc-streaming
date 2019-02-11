import { createStyles, Theme } from "@material-ui/core/styles";

export const inputSourcesConfigurationButtonStyle = (theme: Theme) => createStyles({
  root: {
    alignSelf: "flex-start",
    height: theme.spacing.unit * 5,
    margin: theme.spacing.unit * 2,
    position: "absolute",
    right: 0,
    width: theme.spacing.unit * 5
  }
});
