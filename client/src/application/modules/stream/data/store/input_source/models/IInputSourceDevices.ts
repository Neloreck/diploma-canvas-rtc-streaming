import {Optional} from "@Lib/ts/type/Optional";

export interface IInputSourceDevices {
  videoInput: Optional<MediaDeviceInfo>;
  audioInput: Optional<MediaDeviceInfo>;
}
