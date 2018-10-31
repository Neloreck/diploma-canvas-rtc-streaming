import * as React from "react";
import {Component} from "react";

import {Bind} from "@redux-cbd/utils";

import {Styled} from "@Lib/react_lib/@material_ui";

import {localMediaService} from "@Module/stream/data/services/local_media";
import {StreamStoreConnect} from "@Module/stream/data/store";
import {UpdateInputStreamAndSourcesAction} from "@Module/stream/data/store/source";
import {IInputSourceDevices} from "@Module/stream/data/store/source/models/IInputSourceDevices";

import {Button, Divider, Grid, SwipeableDrawer, Tooltip, Typography} from "@material-ui/core";
import {MoreVert} from "@material-ui/icons";

import {IInputSourcesSelectFormExternalProps, InputSourcesSelectForm} from "../InputSourcesSelectForm";

import {
  IInputSourcesDrawerManagerDispatchProps,
  IInputSourcesDrawerManagerProps,
  IInputSourcesDrawerManagerState,
  IInputSourcesDrawerManagerStoreProps
} from "./InputSourcesDrawerManager.StateProps";
import {inputSourcesDrawerManagerStyle} from "./InputSourcesDrawerManager.Style";

@Styled(inputSourcesDrawerManagerStyle)
@StreamStoreConnect<IInputSourcesDrawerManagerStoreProps, IInputSourcesDrawerManagerDispatchProps, IInputSourcesDrawerManagerProps> (
  (state) => ({
  }), {
    onSourceStreamAndDevicesUpdate: (stream: MediaStream, devices: IInputSourceDevices) => new UpdateInputStreamAndSourcesAction({ stream, devices })
  }
)
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

            <InputSourcesSelectForm onInputSourcesChange={this.onSourcesUpdate}
                                    {...{} as IInputSourcesSelectFormExternalProps}
              />

            <Divider/>

          </Grid>

        </SwipeableDrawer>

      </Grid>
    );
  }

  @Bind
  private async onSourcesUpdate(devices: IInputSourceDevices): Promise<void> {

    const stream: MediaStream = await localMediaService.getUserMedia(devices.videoInput, devices.audioInput);
    this.props.onSourceStreamAndDevicesUpdate(stream, devices);
  }

  @Bind
  private onShowModal(): void {
    this.setState({ showDrawer: true });
  }

  @Bind
  private onHideModal(): void {
    this.setState({ showDrawer: false });
  }

}
