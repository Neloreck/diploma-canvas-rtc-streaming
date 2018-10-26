import {createStyles, Theme} from "@material-ui/core";

export const renderedVideoPreviewStyle = (theme: Theme) => createStyles({
  root: {
    boxSizing: "border-box",
    flexBasis: "20rem",
    flexGrow: 1,
    height: "100%",
    overflow: "hidden",
    width: "100%",

    "& canvas": {
      background: `linear-gradient(to bottom, ${theme.palette.primary.light} 15%, ${theme.palette.primary.dark} 95%);`
    }
  }
});
