import {createStyles, Theme} from "@material-ui/core";

import backgroundImage from "@Module/home/view/assets/images/main-background.jpg";

export const streamCreationPageStyle = (theme: Theme) => createStyles({
  content: {
    background: `url(${backgroundImage}) no-repeat center center fixed`,
    backgroundSize: "cover",
    flexGrow: 75,
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%"
  }
});
