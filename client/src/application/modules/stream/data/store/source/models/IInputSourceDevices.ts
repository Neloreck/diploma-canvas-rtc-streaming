import {Optional} from "@Lib/ts/types";

export interface IInputSourceDevices {
  videoInput: Optional<MediaDeviceInfo>;
  audioInput: Optional<MediaDeviceInfo>;
}
