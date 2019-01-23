import {Theme} from "@material-ui/core";
import {createStyles} from "@material-ui/core/styles";

export const eventCreationFormStyle = (theme: Theme) => createStyles({
  controlBlock: {
    padding: theme.spacing.unit
  },
  editBlock: {
    backgroundColor: theme.palette.type === "light" ? theme.palette.secondary.light : theme.palette.background.default,
    minWidth: theme.spacing.unit * 40,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
    width: theme.spacing.unit * 55
  },
  editField: {
    flexGrow: 1,
    margin: `${theme.spacing.unit}px 0`
  },
  headingBlock: {
    padding: theme.spacing.unit
  },
  loaderPlaceholder: {
    backgroundColor: theme.palette.primary.light,
    height: 10
  },
  root: {
    "& hr": {
      margin: `${theme.spacing.unit * 2}px 0`
    }
  },
  securityBlock: {
    border: `${theme.spacing.unit / 4}px solid ${theme.palette.background.paper}`,
    borderRadius: theme.spacing.unit,
    margin: `${theme.spacing.unit * 2}px 0`,
    padding: theme.spacing.unit
  }
});
