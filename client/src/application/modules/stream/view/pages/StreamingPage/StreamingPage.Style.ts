import {createStyles, Theme} from "@material-ui/core";

export const streamingPageStyle = (theme: Theme) => createStyles({
  content: {
    flexDirection: "column",
    flexGrow: 75,
    flexWrap: "nowrap",
    overflow: "auto",
    width: "100%"
  },
  root: {
    width: "100%"
  },
  streamingVideo: {
    backgroundColor: theme.palette.secondary.light,
    display: "flex",
    flexDirection: "column",
    minHeight: 350,
    minWidth: "100%",
    padding: theme.spacing.unit * 2,
    position: "relative",
    width: "100%"
  },
  streamingVideoSection: {
    backgroundColor: theme.palette.secondary.light,
    justifyContent: "center",
    minHeight: "55vh",
    overflow: "auto",
    width: "100%"
  },
  tabsContent: {
    backgroundColor: theme.palette.secondary.light,
    flexGrow: 1,
    position: "relative"
  },
  under: {
    backgroundColor: theme.palette.secondary.light,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    minHeight: 200
  }
});
