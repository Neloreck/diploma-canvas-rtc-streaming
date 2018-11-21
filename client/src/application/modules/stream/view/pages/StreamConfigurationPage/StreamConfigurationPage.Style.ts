import {createStyles, Theme} from "@material-ui/core";

export const streamConfigurationPageStyle = (theme: Theme) => createStyles({
  configSidebar: {
    backgroundColor: theme.palette.secondary.light,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    minWidth: 250,
    padding: theme.spacing.unit * 2
  },
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
    "@media (max-width: 1225px)": {
      width: "100%",
    },
    "@media (min-width: 1225px)": {
      width: "75%",
    },
    backgroundColor: theme.palette.secondary.light,
    display: "flex",
    flexDirection: "column",
    minHeight: 350,
    minWidth: "75%",
    padding: theme.spacing.unit * 2,
    position: "relative"
  },
  streamingVideoSection: {
    justifyContent: "center",
    minHeight: 600,
    overflow: "auto",
    width: "100%"
  },
  tabsContent: {
    backgroundColor: theme.palette.secondary.dark,
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
