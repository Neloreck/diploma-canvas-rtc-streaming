import {createStyles, Theme} from "@material-ui/core/styles";

export const inputSourcesSelectFormStyle = (theme: Theme) => createStyles({
  inputSelectForm: {
    margin: "0.5rem 0"
  },
  root: {
    boxShadow: "2px 1px 3px 2px inset #000",
    height: "100%",
    padding: "2rem",
    width: "100%"
  }
});
