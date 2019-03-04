import * as React from "react";
import { PureComponent, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";

// View.
import { Fab, Tooltip, WithStyles } from "@material-ui/core";
import { Help } from "@material-ui/icons";
import { streamingHelpButtonStyle } from "./StreamingHelpButton.Style";

// Props.
export interface IStreamingHelpButtonInjectedProps extends WithStyles<typeof streamingHelpButtonStyle> {}
export interface IStreamingHelpButtonOwnProps {}
export interface IStreamingHelpButtonProps extends IStreamingHelpButtonOwnProps, IStreamingHelpButtonInjectedProps {}

@Styled(streamingHelpButtonStyle)
export class StreamingHelpButton extends PureComponent<IStreamingHelpButtonProps> {

  public render(): ReactNode {

    const { classes } = this.props;

    return (
        <Tooltip title={"Search for help."} placement={"right"}>
          <Fab className={classes.root}>
            <Help/>
          </Fab>
        </Tooltip>
    );
  }

}
