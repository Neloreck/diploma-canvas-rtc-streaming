import { createStyles, Theme } from "@material-ui/core/styles";

export const objectTemplateConfigurationBlockStyle = (theme: Theme) => createStyles({
  objectConfiguration: {
    boxSizing: "border-box",
    flexGrow: 1,
    padding: theme.spacing.unit,
    width: "100%"
  },
  objectEditingControlFooter: {
    "& button": {
      marginLeft: theme.spacing.unit * 2
    },
    minHeight: theme.spacing.unit * 7.5,
    padding: theme.spacing.unit * 2,
    width: "100%"
  },
  objectHeading: {
    "& button": {
      marginLeft: theme.spacing.unit
    },
    minHeight: theme.spacing.unit * 5,
    padding: theme.spacing.unit,
    width: "100%"
  },
  objectHeadingTitle: {
    alignItems: "center",
    display: "flex",
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "100%",
    minHeight: 250,
    overflowX: "auto",
    overflowY: "auto",
    padding: theme.spacing.unit,
    width: "100%"
  },
  templateConfigurationWrapper: {
    flexGrow: 1
  },
  templatePreview: {
    padding: theme.spacing.unit
  },
  templateRenderer: {
    "& .canvas-renderer-layout": {
      boxShadow: "none"
    },
    alignSelf: "center",
    justifySelf: "center",
  }
});
