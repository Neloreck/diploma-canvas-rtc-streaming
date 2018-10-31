import * as React from "react";
import {Component} from "react";

import {Bind} from "@redux-cbd/utils";

import {Styled} from "@Lib/react_lib/@material_ui";
import {Optional} from "@Lib/ts/type";

import {localMediaService} from "@Module/stream/data/services/local_media";
import {EDeviceKind} from "@Module/stream/data/services/local_media/EDeviceKind";
import {IInputDevicesBundle} from "@Module/stream/data/services/local_media/IInputDevicesBundle";

import {Button, FormControl, Grid, Input, InputLabel, MenuItem, Select} from "@material-ui/core";
import {Check, Refresh} from "@material-ui/icons";

import {VideoPreview} from "@Module/stream/view/components/elements/video_rendering/VideoPreview";

import {IInputSourcesSelectFormProps, IInputSourcesSelectFormState} from "./InputSourcesSelectForm.StateProps";
import {inputSourcesSelectFormStyle} from "./InputSourcesSelectForm.Style";

@Styled(inputSourcesSelectFormStyle)
export class InputSourcesSelectForm extends Component<IInputSourcesSelectFormProps, IInputSourcesSelectFormState> {

  public readonly state = {
    previewStream: null,

    selectedInputSources: {
      audioInput: null as Optional<MediaDeviceInfo>,
      videoInput: null as Optional<MediaDeviceInfo>
    },

    audioInputSources: [] as Array<MediaDeviceInfo>,
    videoInputSources: [] as Array<MediaDeviceInfo>
  };

  public componentWillMount(): void {
    this.onUpdateMediaDevices()
      .then((inputSources: IInputDevicesBundle): void => {
        this.updatePreviewStream(inputSources.video[0], inputSources.audio[0]);
      });
  }

  public componentWillUnmount(): void {
    localMediaService.killStream(this.state.previewStream);
  }

  public render(): JSX.Element {

    const {classes} = this.props;
    const {audioInputSources, videoInputSources, selectedInputSources, previewStream} = this.state;

    return (
      <Grid className={classes.root} alignItems={"center"} direction={"column"} container>

        <VideoPreview className={classes.videoPreview} stream={previewStream}/>

        {this.renderDevicesSelection(videoInputSources, selectedInputSources.videoInput, "Video Input")}
        {this.renderDevicesSelection(audioInputSources, selectedInputSources.audioInput, "Audio Input")}

        <Grid direction={"row"} container>
          <Button className={classes.actionButton} onClick={this.onUpdateMediaDevices} variant={"outlined"}>
            <Refresh color="primary" style={{ fontSize: "1.2rem" }}/>
          </Button>

          <Button className={classes.actionButton} onClick={this.onChangesAccept} variant={"outlined"}>
            <Check color="primary" style={{ fontSize: "1.2rem" }}/>
          </Button>
        </Grid>

      </Grid>
    );
  }

  private renderDevicesSelection(devices: Array<MediaDeviceInfo>, selected: Optional<MediaDeviceInfo>,
                                 label: string): JSX.Element {
    return (
      <FormControl className={this.props.classes.inputSelectForm}>
        <InputLabel htmlFor="select-multiple">{label}</InputLabel>
        <Select
          value={(selected && selected.deviceId) || -1}
          onChange={(e) => this.handleDeviceSelection(devices.find((it) => it.deviceId === e.target.value))}
          input={<Input/>}
        >
          {devices.map((device, idx) => (
            <MenuItem
              key={device.deviceId}
              value={device.deviceId}
            >
              {device.label || device.kind + idx}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  @Bind
  private async onUpdateMediaDevices(): Promise<IInputDevicesBundle> {

    const inputSources: IInputDevicesBundle = await localMediaService.getInputDevicesBundled();
    const {selectedInputSources: {videoInput, audioInput}} = this.state;

    const newState = {
      ...this.state,
      audioInputSources: inputSources.audio,
      videoInputSources: inputSources.video,
    };

    if (videoInput === null ||
      !inputSources.video.find((videoDevice) => videoDevice.deviceId === videoInput.deviceId)) {
      newState.selectedInputSources.videoInput = inputSources.video[0] || null;
    }

    if (audioInput === null ||
      !inputSources.audio.find((audioDevice) => audioDevice.deviceId === audioInput.deviceId)) {
      newState.selectedInputSources.audioInput = inputSources.audio[0] || null;
    }

    const {selectedInputSources} = newState;

    if (this.shouldPreviewStreamUpdate(this.state, newState)) {
      this.updatePreviewStream(selectedInputSources.videoInput, selectedInputSources.audioInput);
    }

    this.setState(newState);

    return inputSources;
  }

  @Bind
  private handleDeviceSelection(device: MediaDeviceInfo | undefined): void {

    if (!device) {
      return;
    }

    const newState = { ...this.state, selectedInputSources: { ...this.state.selectedInputSources } };

    switch (device.kind) {

      case EDeviceKind.AUDIO_INPUT:
        newState.selectedInputSources.audioInput = device;
        break;

      case EDeviceKind.VIDEO_INPUT:
        newState.selectedInputSources.videoInput = device;
        break;

    }

    if (this.shouldPreviewStreamUpdate(this.state, newState)) {
      this.updatePreviewStream(newState.selectedInputSources.videoInput, newState.selectedInputSources.audioInput);
    }

    this.setState(newState);
  }

  @Bind
  private onChangesAccept(): void {
    this.props.onInputSourcesChange(this.state.selectedInputSources);
  }

  private shouldPreviewStreamUpdate(oldState: IInputSourcesSelectFormState, newState: IInputSourcesSelectFormState): boolean {

    const {selectedInputSources: oldSources} = oldState;
    const {selectedInputSources: newSources} = newState;

    return (oldSources.audioInput !== newSources.audioInput || oldSources.videoInput !== newSources.videoInput);
  }

  private async updatePreviewStream(videoDevice: Optional<MediaDeviceInfo>, audioDevice: Optional<MediaDeviceInfo>): Promise<void> {

    const stream: MediaStream = await localMediaService.getUserMedia(videoDevice, audioDevice);

    localMediaService.killStream(this.state.previewStream);

    this.setState({
      previewStream: stream,
      selectedInputSources: {
        audioInput: audioDevice,
        videoInput: videoDevice
      }
    });
  }

}
