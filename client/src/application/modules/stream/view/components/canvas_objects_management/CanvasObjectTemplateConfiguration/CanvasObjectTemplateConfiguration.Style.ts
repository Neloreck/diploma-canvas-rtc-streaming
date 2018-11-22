import {createStyles, Theme} from "@material-ui/core/styles";

export const canvasObjectTemplateConfigurationStyle = (theme: Theme) => createStyles({
  objectEditingControlFooter: {
    "& button": {
      marginLeft: theme.spacing.unit * 2
    },
    padding: theme.spacing.unit * 2,
    width: "100%"
  },
  objectEditingMenu: {
    flexGrow: 1,
    position: "relative",
    width: "100%"
  },
  objectEditingMenuContent: {
    height: "100%",
    position: "absolute",
    width: "100%"
  },
  objectHeading: {
    "& button": {
      marginLeft: theme.spacing.unit
    },
    padding: theme.spacing.unit,
    width: "100%"
  },
  objectHeadingTitle: {
    alignItems: "center",
    display: "flex"
  },
  objectPreviewConfiguration: {
    boxSizing: "border-box",
    padding: theme.spacing.unit * 2
  },
  objectPreviewRenderer: {
    "& canvas": {
      backgroundColor: theme.palette.secondary.light,
      boxShadow: "2px 2px 16px 0 black"
    },
    flexGrow: 1,
    height: "100%",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px`
  },
  root: {
    backgroundColor: theme.palette.secondary.light,
    borderLeft: "2px solid " + theme.palette.secondary.dark,
    height: "100%",
    minWidth: theme.spacing.unit * 44,
    overflowX: "auto",
    overflowY: "hidden",
    padding: theme.spacing.unit,
    width: "100%"
  }
});
