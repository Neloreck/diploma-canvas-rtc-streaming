import * as React from "react";
import {Component} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/@material_ui";

// View.
import {Button, Collapse, Grid, Tooltip, WithStyles} from "@material-ui/core";
import {Help} from "@material-ui/icons";
import {streamingHelpButtonTooltipStyle} from "./StreamingHelpButtonTooltip.Style";

// Props.
export interface IStreamingHelpButtonTooltipExternalProps extends WithStyles<typeof streamingHelpButtonTooltipStyle> {}

export interface IStreamingHelpButtonTooltipOwnProps {}

export interface IStreamingHelpButtonTooltipProps extends IStreamingHelpButtonTooltipOwnProps, IStreamingHelpButtonTooltipExternalProps {}

@Styled(streamingHelpButtonTooltipStyle)
export class StreamingHelpButtonTooltip extends Component<IStreamingHelpButtonTooltipProps> {

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
