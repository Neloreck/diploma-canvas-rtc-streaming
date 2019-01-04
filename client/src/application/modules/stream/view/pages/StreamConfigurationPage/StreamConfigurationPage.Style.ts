import {createStyles, Theme} from "@material-ui/core";

export const streamConfigurationPageStyle = (theme: Theme) => createStyles({
  content: {
    flexGrow: 75,
  },
  root: {
    backgroundColor: theme.palette.type === "light" ? theme.palette.background.paper : theme.palette.secondary.dark,
    width: "100%"
  }
});
