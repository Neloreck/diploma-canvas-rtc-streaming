import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Component} from "react";

import {Styled} from "@Lib/react_lib/@material_ui";

import {localMediaService} from "@Module/stream/data/services/local_media";
import {graphicsContextManager, IGraphicsContext, ISourceContext, sourceContext} from "@Module/stream/data/store";
import {IInputSourceDevices} from "@Module/stream/data/store/source/models/IInputSourceDevices";

import {Button, Grid, SwipeableDrawer, Tooltip, WithStyles} from "@material-ui/core";
import {MoreVert} from "@material-ui/icons";

import {IInputSourcesDrawerContentExternalProps, InputSourcesDrawerContent} from "../InputSourcesDrawerContent";

import {inputSourcesDrawerButtonTooltipStyle} from "./InputSourcesDrawerButtonTooltip.Style";

export interface IInputSourcesDrawerButtonTooltipState {
  showDrawer: boolean;
}

export interface IInputSourcesDrawerButtonTooltipExternalProps extends WithStyles<typeof inputSourcesDrawerButtonTooltipStyle>, ISourceContext, IGraphicsContext {}

export interface IInputSourcesDrawerButtonTooltipOwnProps {}

export interface IInputSourcesDrawerButtonTooltipProps extends IInputSourcesDrawerButtonTooltipOwnProps, IInputSourcesDrawerButtonTooltipExternalProps {}

@Consume<IGraphicsContext, IInputSourcesDrawerButtonTooltipProps>(graphicsContextManager)
@Consume<ISourceContext, IInputSourcesDrawerButtonTooltipProps>(sourceContext)
@Styled(inputSourcesDrawerButtonTooltipStyle)
export class InputSourcesDrawerButtonTooltip extends Component<IInputSourcesDrawerButtonTooltipProps, IInputSourcesDrawerButtonTooltipState> {

  public readonly state: IInputSourcesDrawerButtonTooltipState = {
    showDrawer: false
  };

  public render(): JSX.Element {

    const {classes} = this.props;
    const {showDrawer} = this.state;

    return (
      <Grid className={classes.root}>

        <Tooltip title={"Configure source."} placement={"right"}>
          <Button className={classes.configureSourceTooltip} variant={"fab"} onClick={this.onShowModal}>
            <MoreVert/>
          </Button>
        </Tooltip>

        <SwipeableDrawer
          open={showDrawer}
          onClose={this.onHideModal}
          onOpen={this.onShowModal}
        >
          <InputSourcesDrawerContent onInputSourcesChange={this.onSourcesUpdate}{...{} as IInputSourcesDrawerContentExternalProps}/>
        </SwipeableDrawer>

      </Grid>
    );
  }

  @Bind()
  private async onSourcesUpdate(devices: IInputSourceDevices): Promise<void> {

    const {graphicsState: {showMainVideo}, sourceActions: {updateInputStreamAndSources, updateInputSources}} = this.props;

    if (showMainVideo) {
      const stream: MediaStream = await localMediaService.getUserMedia(devices.videoInput, false);
      updateInputStreamAndSources(stream, devices);
    } else {
      updateInputSources(devices);
    }
  }

  @Bind()
  private onShowModal(): void {
    this.setState({ showDrawer: true });
  }

  @Bind()
  private onHideModal(): void {
    this.setState({ showDrawer: false });
  }

}
