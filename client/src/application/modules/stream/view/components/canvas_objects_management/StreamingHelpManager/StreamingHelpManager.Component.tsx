import * as React from "react";
import {Component} from "react";

import {Styled} from "@Lib/react_lib/@material_ui";

import {Button, Collapse, Grid, Tooltip, WithStyles} from "@material-ui/core";
import {Help} from "@material-ui/icons";

import {streamingHelpManagerStyle} from "./StreamingHelpManager.Style";

export interface IStreamingHelpManagerExternalProps extends WithStyles<typeof streamingHelpManagerStyle> {}

export interface IStreamingHelpManagerOwnProps {}

export interface IStreamingHelpManagerProps extends IStreamingHelpManagerOwnProps, IStreamingHelpManagerExternalProps {}

@Styled(streamingHelpManagerStyle)
export class StreamingHelpManager extends Component<IStreamingHelpManagerProps> {

  public render(): JSX.Element {

    const {classes, } = this.props;

    return (
      <Grid className={classes.root}>

        <Tooltip title={"Search for help."} placement={"right"}>
          <Button className={classes.helpTooltip} variant={"fab"}>
            <Help/>
          </Button>
        </Tooltip>

        <Collapse in={false}>
          <div>
            HELP
          </div>
        </Collapse>

      </Grid>
    );
  }

}
