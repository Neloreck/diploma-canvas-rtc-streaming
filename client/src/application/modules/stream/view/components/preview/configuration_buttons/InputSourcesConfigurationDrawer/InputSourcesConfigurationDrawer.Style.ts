import {createStyles, Theme} from "@material-ui/core/styles";

export const inputSourcesConfigurationDrawerStyle = (theme: Theme) => createStyles({
  actionButton: {
    flexGrow: 1,
    margin: theme.spacing.unit
  },
  inputSelectForm: {
    maxWidth: "100%",
    padding: theme.spacing.unit,
    width: "100%"
  },
  root: {
    display: "flex",
    padding: theme.spacing.unit * 2,
    width: 350
  },
  selectionForm: {
    height: "100%",
    justifyContent: "center",
    overflow: "auto",
    padding: theme.spacing.unit,
    width: "100%"
  },
  videoPreview: {
    backgroundColor: theme.palette.secondary.light,
    height: 168,
    marginBottom: theme.spacing.unit * 3,
    width: 300
  }
});
