import { createStyles, Theme } from "@material-ui/core/styles";

export const headerBarLogoNavigationStyle = (theme: Theme) => createStyles({
  homeButton: {
    margin: theme.spacing.unit / 2
  },
  logo: {
    color: theme.palette.text.secondary,
    cursor: "pointer",
    minWidth: 100
  }
});
