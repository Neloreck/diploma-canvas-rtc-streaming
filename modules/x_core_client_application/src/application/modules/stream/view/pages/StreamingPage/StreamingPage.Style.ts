import {createStyles, Theme} from "@material-ui/core";

export const streamingPageStyle = (theme: Theme) => createStyles({
  content: {
    backgroundColor: theme.palette.type === "light" ? theme.palette.background.paper : theme.palette.secondary.dark,
    flexGrow: 75,
  },
  root: {
    backgroundColor: theme.palette.type === "light" ? theme.palette.background.paper : theme.palette.secondary.dark,
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
