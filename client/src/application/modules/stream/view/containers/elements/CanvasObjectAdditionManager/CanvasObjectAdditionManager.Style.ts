import {createStyles, Theme} from "@material-ui/core/styles";

const tooltipSize: string = "40px";

export const canvasObjectAdditionManagerStyle = (theme: Theme) => createStyles({
  addObjectTooltip: {
    height: tooltipSize,
    margin: "16px",
    width: tooltipSize
  },
  root: {
    alignSelf: "flex-start",
    left: 0,
    position: "absolute",
  }
});
