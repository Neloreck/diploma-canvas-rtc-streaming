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
    margin: `${theme.spacing.unit}px 0`,
    width: "100%"
  },
  headingBlock: {
    padding: theme.spacing.unit
  },
  root: {
    "& hr": {
      margin: `${theme.spacing.unit * 2}px 0`
    }
  }
});
