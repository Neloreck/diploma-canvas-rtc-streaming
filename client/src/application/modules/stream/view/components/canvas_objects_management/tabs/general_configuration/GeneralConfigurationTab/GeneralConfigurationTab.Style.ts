import {createStyles, Theme} from "@material-ui/core/styles";

export const generalConfigurationTabStyle = (theme: Theme) => createStyles({
  root: {
    boxSizing: "border-box",
    height: "100%",
    maxHeight: "100%",
    overflowY: "auto",
    position: "absolute"
  }
});
