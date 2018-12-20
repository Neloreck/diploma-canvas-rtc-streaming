import {Theme} from "@material-ui/core/es";
import {createStyles} from "@material-ui/core/styles";

export const homePageStyle = (theme: Theme) => createStyles({
  content: {
    flexGrow: 24,
    width: "100%"
  },
  root: {
    backgroundColor: theme.palette.type === "light" ? theme.palette.background.paper : theme.palette.secondary.dark,
    height: "100%",
    width: "100%"
  }
});
