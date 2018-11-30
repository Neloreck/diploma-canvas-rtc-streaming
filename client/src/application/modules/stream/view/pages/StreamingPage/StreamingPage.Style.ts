import {createStyles, Theme} from "@material-ui/core";

export const streamingPageStyle = (theme: Theme) => createStyles({
  content: {
    flexGrow: 75,
  },
  root: {
    width: "100%"
  },
  streamingVideoSection: {
    backgroundColor: theme.palette.secondary.light,
    flexGrow: 2,
    justifyContent: "center",
    minHeight: "20vh",
    position: "relative",
    width: "100%"
  },

});
