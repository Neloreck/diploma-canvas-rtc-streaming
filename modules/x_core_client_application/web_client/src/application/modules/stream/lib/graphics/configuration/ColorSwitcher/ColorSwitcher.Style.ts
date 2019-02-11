import { createStyles, Theme } from "@material-ui/core/styles";

export const colorSwitcherStyle = (theme: Theme) => createStyles({
  modalBackdrop: {
    backgroundColor: "rgba(45, 45, 45, 0.75)",
    bottom: 0,
    left: 0,
    position: "fixed",
    right: 0,
    top: 0,
    zIndex: -1
  },
  modalCloseButton: {
    color: "#FFF",
    cursor: "pointer",
    margin: theme.spacing.unit,
    position: "absolute",
    right: 0,
    top: 0
  },
  modalRoot: {
    backgroundColor: "rgba(45, 45, 45, 0.75)",
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1
  },
  root: {
    margin: theme.spacing.unit,
    minHeight: theme.spacing.unit * 5.5
  }
});
