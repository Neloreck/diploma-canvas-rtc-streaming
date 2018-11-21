import {createStyles, Theme} from "@material-ui/core/styles";

export const canvasObjectsConfigurationTabStyle = (theme: Theme) => createStyles({
  noGraphicsMessage: {
    height: "100%"
  },
  objectListItem: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.main
    },
    cursor: "pointer"
  },
  objectListItemSecondary: {
    cursor: "pointer",
    padding: theme.spacing.unit
  },
  objectListItemSelected: {
    backgroundColor: theme.palette.secondary.dark
  },
  objectsConfigurationBlock: {
    flexGrow: 10
  },
  objectsList: {
    backgroundColor: theme.palette.secondary.light,
    flexBasis: theme.spacing.unit * 34,
    flexGrow: 1,
    minWidth: theme.spacing.unit * 34,
    padding: `0 ${theme.spacing.unit}px`,
    width: "100%"
  },
  root: {
    flexWrap: "nowrap",
    height: "100%",
    position: "absolute",
    width: "100%"
  }
});