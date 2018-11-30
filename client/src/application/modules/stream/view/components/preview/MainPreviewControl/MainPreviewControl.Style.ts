import {createStyles, Theme} from "@material-ui/core";

export const mainPreviewControlStyle = (theme: Theme) => createStyles({
  controlButtons: {
    left: 0,
    position: "absolute",
    top: 0
  },
  root: {
    boxSizing: "border-box",
    flexBasis: "20rem",
    flexGrow: 1,
    height: "100%",
    position: "absolute",
    width: "100%",

    "& canvas": {
      background: `linear-gradient(to bottom, ${theme.palette.primary.light} 15%, ${theme.palette.primary.dark} 95%);`
    }
  },
  videoContainer: {
    height: "100%",
    padding: theme.spacing.unit * 2,
    width: "100%"
  }
});
