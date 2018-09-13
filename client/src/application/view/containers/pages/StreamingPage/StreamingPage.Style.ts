import {createStyles, Theme} from "@material-ui/core/styles";

export const streamingPageStyle = (theme: Theme) => createStyles({
  content: {
    flexGrow: 24,
    width: "100%"
  },
  root: {
    width: "100%"
  },
  streamingComments: {
    boxSizing: "border-box",
    height: "100%",
    width: "25%"
  },
  streamingVideo: {
    boxSizing: "border-box",
    height: "100%",
    width: "75%"
  },
  streamingVideoSection: {
    flexGrow: 4,
    width: "100%"
  },
  under: {
    flexGrow: 6
  }
});
