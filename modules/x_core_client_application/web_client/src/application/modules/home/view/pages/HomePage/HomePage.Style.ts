import {Theme} from "@material-ui/core/es";
import {createStyles} from "@material-ui/core/styles";

import homePageMainImage from "@Module/home/view/assets/images/home/main-preview.jpg";

export const homePageStyle = (theme: Theme) => createStyles({
  content: {
    background: `url(${homePageMainImage}) no-repeat center center fixed`,
    backgroundSize: "cover",
    flexGrow: 24,
    padding: theme.spacing.unit,
    overflowY: "auto",
    width: "100%"
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "100%",
    width: "100%"
  }
});
