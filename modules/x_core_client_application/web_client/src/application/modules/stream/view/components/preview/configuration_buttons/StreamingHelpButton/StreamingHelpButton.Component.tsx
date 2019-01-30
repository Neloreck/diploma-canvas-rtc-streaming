import * as React from "react";
import {PureComponent, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";

// View.
import {Collapse, Fab, Grid, Tooltip, WithStyles} from "@material-ui/core";
import {Help} from "@material-ui/icons";
import {streamingHelpButtonStyle} from "./StreamingHelpButton.Style";

// Props.
export interface IStreamingHelpButtonExternalProps extends WithStyles<typeof streamingHelpButtonStyle> {}

export interface IStreamingHelpButtonOwnProps {}

export interface IStreamingHelpButtonProps extends IStreamingHelpButtonOwnProps, IStreamingHelpButtonExternalProps {}

@Styled(streamingHelpButtonStyle)
export class StreamingHelpButton extends PureComponent<IStreamingHelpButtonProps> {

  public render(): ReactNode {

    const {classes, } = this.props;

    return (
        <Tooltip title={"Search for help."} placement={"right"}>
          <Fab className={classes.root}>
            <Help/>
          </Fab>
        </Tooltip>
    );
  }

}