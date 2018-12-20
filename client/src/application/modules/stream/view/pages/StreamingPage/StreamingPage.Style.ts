import {createStyles, Theme} from "@material-ui/core";

export const streamingPageStyle = (theme: Theme) => createStyles({
  content: {
    flexGrow: 75,
  },
  root: {
    width: "100%"
  },
  streamingVideoSection: {
    backgroundColor: theme.palette.type === "light" ? theme.palette.background.paper : theme.palette.secondary.dark,
    flexGrow: 2,
    justifyContent: "center",
    minHeight: "25vh",
    position: "relative",
    width: "100%"
  },

});
