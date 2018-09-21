import {createStyles, Theme} from "@material-ui/core/styles";

export const streamingPageStyle = (theme: Theme) => createStyles({
  content: {
    flexDirection: "column",
    flexGrow: 75,
    flexWrap: "nowrap",
    width: "100%"
  },
  root: {
    width: "100%"
  },
  streamingComments: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    minWidth: 250,
  },
  streamingVideo: {
    display: "flex",
    flexBasis: "25rem",
    flexDirection: "column",
    flexGrow: 7,
    minHeight: 250,
    minWidth: "75%"
  },
  streamingVideoSection: {
    flexBasis: "50rem",
    flexGrow: 4,
    width: "100%"
  },
  under: {
    flexGrow: 6
  }
});
