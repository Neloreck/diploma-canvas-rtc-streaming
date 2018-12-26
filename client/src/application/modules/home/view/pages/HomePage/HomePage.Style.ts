import {Theme} from "@material-ui/core/es";
import {createStyles} from "@material-ui/core/styles";

export const homePageStyle = (theme: Theme) => createStyles({
  content: {
    flexGrow: 24,
    width: "100%"
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "100%",
    width: "100%"
  }
});
