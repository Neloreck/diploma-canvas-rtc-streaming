import {createStyles, Theme} from "@material-ui/core";

export const mainPreviewControlStyle = (theme: Theme) => createStyles({
  controlsVisibilityButton: {
    height: theme.spacing.unit * 5,
    left: 0,
    margin: theme.spacing.unit * 2,
    position: "absolute",
    top: 0,
    width: theme.spacing.unit * 5,
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
    padding: theme.spacing.unit * 1.5,
    width: "100%"
  }
});
