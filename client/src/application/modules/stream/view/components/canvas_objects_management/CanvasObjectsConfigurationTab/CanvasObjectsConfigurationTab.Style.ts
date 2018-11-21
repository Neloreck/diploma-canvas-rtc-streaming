import {createStyles, Theme} from "@material-ui/core/styles";

export const canvasObjectsConfigurationTabStyle = (theme: Theme) => createStyles({
  objectsConfigurationBlock: {
    flexGrow: 10
  },
  objectsList: {
    backgroundColor: theme.palette.secondary.light,
    flexGrow: 1
  },
  root: {
    height: "100%",
    position: "absolute",
    width: "100%"
  }
});
