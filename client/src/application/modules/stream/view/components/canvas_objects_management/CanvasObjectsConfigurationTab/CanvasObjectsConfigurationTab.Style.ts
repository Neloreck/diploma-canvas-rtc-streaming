import {createStyles, Theme} from "@material-ui/core/styles";

export const canvasObjectsConfigurationTabStyle = (theme: Theme) => createStyles({
  itemListControlsBlock: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`
  },
  noGraphicsMessage: {
    height: "100%"
  },
  objectListItem: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.main
    },
    cursor: "pointer",
    transition: "150ms"
  },
  objectListItemSecondary: {
    cursor: "pointer",
    padding: theme.spacing.unit
  },
  objectListItemSelected: {
    backgroundColor: theme.palette.secondary.dark
  },
  objectsConfigurationBlock: {
    flexGrow: 10,
    minWidth: theme.spacing.unit * 45
  },
  objectsList: {
    backgroundColor: theme.palette.secondary.light,
    flexBasis: theme.spacing.unit * 34,
    flexGrow: 1,
    maxHeight: "100%",
    minWidth: theme.spacing.unit * 34,
    overflowY: "auto",
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
