import { Bind } from "@redux-cbd/utils";
import * as React from "react";
import { ChangeEvent, PureComponent, ReactNode } from "react";

// Lib.
import { getVideoInputs } from "@Lib/media";
import { Styled } from "@Lib/react_lib/mui";
import { Optional } from "@Lib/ts/types";

// Data.

// View.
import {
  Button,
  FormControl, Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  WithStyles
} from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import { videoDeviceSwitcherStyle } from "./VideoDeviceSwitcher.Style";

// Props.
export interface IVideoDeviceSwitcherState {
  videoInputSources: Array<MediaDeviceInfo>;
}

export interface IVideoDeviceSwitcherOwnProps {
  label?: string;
  value: Optional<string>;
  onChange: (value: Optional<string>) => void;
}

export interface IVideoDeviceSwitcherExternalProps extends WithStyles<typeof videoDeviceSwitcherStyle> {}
export interface IVideoDeviceSwitcherProps extends IVideoDeviceSwitcherOwnProps, IVideoDeviceSwitcherExternalProps {}

@Styled(videoDeviceSwitcherStyle)
export class VideoDeviceSwitcher extends PureComponent<IVideoDeviceSwitcherProps, IVideoDeviceSwitcherState> {

  public state: IVideoDeviceSwitcherState = {
    videoInputSources: []
  };

  public componentWillMount(): void {
    this.onUpdateMediaDevices().then();
  }

  public render(): ReactNode {

    const { label, classes, value } = this.props;
    const { videoInputSources } = this.state;

    return (
      <Grid className={classes.root} container>

        <Grid item xs={10}>
          <FormControl className={classes.select}>
            <InputLabel htmlFor="select-multiple">{label}</InputLabel>
            <Select
              value={value || (videoInputSources[0]) && videoInputSources[0].deviceId}
              onChange={(e: ChangeEvent<HTMLSelectElement>): void => this.onChange(videoInputSources.find((it: MediaDeviceInfo) => it.deviceId === e.target.value) as MediaDeviceInfo)}
              input={<Input/>}
            >
              {
                videoInputSources.map((device: MediaDeviceInfo, idx: number) => (
                  <MenuItem
                    key={device.deviceId}
                    value={device.deviceId}
                  >
                    {device.label || device.kind + idx}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={2}>
          <Button className={classes.button} onClick={this.onUpdateMediaDevices} variant={"outlined"}>
            <Refresh color="primary" style={{ fontSize: "1.2rem" }}/>
          </Button>
        </Grid>

      </Grid>
    );
  }

  @Bind()
  private async onUpdateMediaDevices(): Promise<void> {

    const videoDevices: Array<MediaDeviceInfo> = await getVideoInputs();

    this.setState({ videoInputSources: videoDevices });
  }

  @Bind()
  private onChange(device: MediaDeviceInfo): void {
    this.props.onChange(device.deviceId);
  }

}
