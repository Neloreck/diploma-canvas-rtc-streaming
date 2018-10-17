import {createStyles, Theme} from "@material-ui/core/styles";

export const inputSourcesDrawerManagerStyle = (theme: Theme) => createStyles({
  configureSourceTooltip: {
    height: theme.spacing.unit * 5,
    margin: theme.spacing.unit * 2,
    width: theme.spacing.unit * 5,
  },
  drawerMenu: {
    width: 350
  },
  root: {
    alignSelf: "flex-start",
    left: 0,
    position: "absolute",
    width: 0
  }
});
