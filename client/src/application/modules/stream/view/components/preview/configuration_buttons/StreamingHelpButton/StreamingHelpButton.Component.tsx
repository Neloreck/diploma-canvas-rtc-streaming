import * as React from "react";
import {PureComponent} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/@material_ui";

// View.
import {Button, Collapse, Grid, Tooltip, WithStyles} from "@material-ui/core";
import {Help} from "@material-ui/icons";
import {streamingHelpButtonStyle} from "./StreamingHelpButton.Style";

// Props.
export interface IStreamingHelpButtonExternalProps extends WithStyles<typeof streamingHelpButtonStyle> {}

export interface IStreamingHelpButtonOwnProps {}

export interface IStreamingHelpButtonProps extends IStreamingHelpButtonOwnProps, IStreamingHelpButtonExternalProps {}

@Styled(streamingHelpButtonStyle)
export class StreamingHelpButton extends PureComponent<IStreamingHelpButtonProps> {

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
