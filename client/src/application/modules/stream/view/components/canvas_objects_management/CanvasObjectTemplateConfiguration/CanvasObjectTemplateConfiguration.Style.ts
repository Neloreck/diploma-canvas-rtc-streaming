import {createStyles, Theme} from "@material-ui/core/styles";

export const canvasObjectTemplateConfigurationStyle = (theme: Theme) => createStyles({
  objectEditingControlFooter: {
    "& button": {
      marginLeft: theme.spacing.unit * 2
    },
    width: "100%"
  },
  objectEditingMenu: {
    flexGrow: 1,
    padding: theme.spacing.unit,
    width: "100%"
  },
  objectHeading: {
    "& button": {
      marginLeft: theme.spacing.unit
    },
    width: "100%"
  },
  objectPreviewConfiguration: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2
  },
  objectPreviewRenderer: {
    "& canvas": {
      backgroundColor: theme.palette.secondary.light,
      boxShadow: "2px 2px 16px 0 black"
    },
    height: "100%",
    padding: theme.spacing.unit * 2,
    width: "25%"
  },
  root: {
    backgroundColor: theme.palette.secondary.light,
    borderLeft: "2px solid " + theme.palette.secondary.dark,
    height: "100%",
    overflow: "hidden",
    padding: theme.spacing.unit * 2,
    width: "100%"
  }
});
