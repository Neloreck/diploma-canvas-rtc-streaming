import * as React from "react";
import {Component} from "react";

import {Button, FormControl, Grid, Input, InputLabel, MenuItem, Select} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";

import {Styled} from "@Lib/react_lib/@material_ui";
import {Optional} from "@Lib/ts/type";

import {LocalMediaService} from "@Module/stream/data/services/local_media";

import {IInputSourcesSelectFormProps} from "./InputSourcesSelectForm.StateProps";
import {inputSourcesSelectFormStyle} from "./InputSourcesSelectForm.Style";

@Styled(inputSourcesSelectFormStyle)
export class InputSourcesSelectForm extends Component<IInputSourcesSelectFormProps> {

  public readonly state = {
    selectedInputSources: {
      audioInput: null as Optional<MediaDeviceInfo>,
      videoInput: null as Optional<MediaDeviceInfo>
    },

    audioInputSources: [] as Array<MediaDeviceInfo>,
    videoInputSources: [] as Array<MediaDeviceInfo>,
  };

  private readonly localMediaService: LocalMediaService = new LocalMediaService();

  public componentWillMount(): void {
    this.updateMediaDevices();
  }

  public render(): JSX.Element {
    const [state, props] = [this.state, this.props];

    return (
      <Grid className={props.classes.root} direction={"column"}>

        <video/>

        <Button>
          <RefreshIcon color="primary" style={{ fontSize: "1.2rem" }} onClick={() => this.updateMediaDevices()} />
        </Button>

        {this.renderDevicesSelection(state.audioInputSources, state.selectedInputSources.audioInput, "Audio Input")}
        {this.renderDevicesSelection(state.videoInputSources, state.selectedInputSources.videoInput, "Video Input")}

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

  private async updateMediaDevices(): Promise<void> {
    const newState = { ...this.state };
    const inputSources: Array<MediaDeviceInfo> = await this.localMediaService.getDevices();

    newState.audioInputSources = inputSources.filter((source) => source.kind === "audioinput");
    newState.videoInputSources = inputSources.filter((source) => source.kind === "videoinput");

    this.setState(newState);
  }

  private handleDeviceSelection(device: MediaDeviceInfo | undefined): void {

    if (!device) {
      return;
    }

    const newState = { ...this.state };

    switch (device.kind) {

      case "audioinput":
        newState.selectedInputSources.audioInput = device;
        break;

      case "videoinput":
        newState.selectedInputSources.videoInput = device;
        break;

    }

    this.setState(newState);
    this.props.onInputSourcesChange(newState.selectedInputSources);
  }

}
