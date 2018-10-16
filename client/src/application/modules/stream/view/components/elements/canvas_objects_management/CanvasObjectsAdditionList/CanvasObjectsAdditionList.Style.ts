import {createStyles, Theme} from "@material-ui/core/styles";

export const canvasObjectsAdditionListStyle = (theme: Theme) => createStyles({
  descriptionItem: {
  },
  descriptorItemSecondary: {
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "inset 1px 0px 25px 2px black",
    flexGrow: 1,
    margin: `0 ${theme.spacing.unit * 4}px`,
    minWidth: "300px"
  }
});
