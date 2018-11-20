import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Component} from "react";

import {Styled} from "@Lib/react_lib/@material_ui";

import {localMediaService} from "@Module/stream/data/services/local_media";
import {ISourceContextState, sourceContext} from "@Module/stream/data/store";
import {IInputSourceDevices} from "@Module/stream/data/store/source/models/IInputSourceDevices";

import {Button, Divider, Grid, SwipeableDrawer, Tooltip, Typography, WithStyles} from "@material-ui/core";
import {MoreVert} from "@material-ui/icons";

import {IInputSourcesSelectFormExternalProps, InputSourcesSelectForm} from "../InputSourcesSelectForm";

import {inputSourcesDrawerManagerStyle} from "./InputSourcesDrawerManager.Style";

export interface IInputSourcesDrawerManagerState {
  showDrawer: boolean;
}

export interface IInputSourcesDrawerManagerExternalProps extends WithStyles<typeof inputSourcesDrawerManagerStyle>, ISourceContextState {}

export interface IInputSourcesDrawerManagerOwnProps {}

export interface IInputSourcesDrawerManagerProps extends IInputSourcesDrawerManagerOwnProps, IInputSourcesDrawerManagerExternalProps {}

@Consume<ISourceContextState, IInputSourcesDrawerManagerProps>(sourceContext)
@Styled(inputSourcesDrawerManagerStyle)
export class InputSourcesDrawerManager extends Component<IInputSourcesDrawerManagerProps, IInputSourcesDrawerManagerState> {

  public readonly state: IInputSourcesDrawerManagerState = {
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

          <Grid
            className={classes.drawerMenu}
            direction={"column"}
            justify={"center"}
            container
          >

            <Typography variant={"h6"} gutterBottom> Input Source </Typography>

            <Divider/>

            <InputSourcesSelectForm onInputSourcesChange={this.onSourcesUpdate}{...{} as IInputSourcesSelectFormExternalProps}/>

            <Divider/>

          </Grid>

        </SwipeableDrawer>

      </Grid>
    );
  }

  @Bind()
  private async onSourcesUpdate(devices: IInputSourceDevices): Promise<void> {
    const stream: MediaStream = await localMediaService.getUserMedia(devices.videoInput, devices.audioInput);
    this.props.sourceActions.updateInputStreamAndSources(stream, devices);
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
