import {createStyles, Theme} from "@material-ui/core/styles";

export const objectAdditionMenuStyle = (theme: Theme) => createStyles({
  descriptionItem: {
  },
  descriptorItemSecondary: {
  },
  root: {
    backgroundColor: theme.palette.primary.light,
    flexGrow: 1,
    margin: `0 ${theme.spacing.unit * 4}px`,
    minWidth: "300px"
  }
});
