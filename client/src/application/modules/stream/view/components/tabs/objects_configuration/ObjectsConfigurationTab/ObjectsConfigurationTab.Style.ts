import {createStyles, Theme} from "@material-ui/core/styles";

export const objectsConfigurationTabStyle = (theme: Theme) => createStyles({
  additionalListControlButtonsBlock: {
    display: "inline-block"
  },
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
    transition: "500ms"
  },
  objectListItemSecondary: {
    cursor: "pointer",
    padding: theme.spacing.unit
  },
  objectListItemSelected: {
    backgroundColor: theme.palette.secondary.dark,
    transition: "500ms"
  },
  objectsConfigurationBlock: {
    flexGrow: 3,
    minWidth: "40%"
  },
  objectsList: {
    backgroundColor: theme.palette.secondary.light,
    boxSizing: "border-box",
    flexGrow: 1,
    minWidth: theme.spacing.unit * 45,
    overflowY: "auto",
    padding: `0 ${theme.spacing.unit}px`,
    transition: "all 100ms ease-out 0s"
  },
  resizer: {
    backgroundColor: theme.palette.primary.dark,
    width: theme.spacing.unit / 2
  },
  root: {
    height: "100%",
    position: "absolute",
    width: "100%"
  }
});
