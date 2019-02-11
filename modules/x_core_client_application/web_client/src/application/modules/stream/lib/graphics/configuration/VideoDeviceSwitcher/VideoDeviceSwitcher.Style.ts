import { createStyles, Theme } from "@material-ui/core/styles";

export const videoDeviceSwitcherStyle = (theme: Theme) => createStyles({
  button: {
  },
  root: {
    "& > div": {
      alignItems: "center",
      display: "flex",
      justifyContent: "center"
    },
    minHeight: theme.spacing.unit * 5.5
  },
  select: {
    flexGrow: 1,
    marginLeft: theme.spacing.unit,
    width: "100%"
  },
});
