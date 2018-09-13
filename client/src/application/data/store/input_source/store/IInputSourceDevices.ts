import {Optional} from "@Lib/type/Optional";

export interface IInputSourceDevices {

  videoInput: Optional<MediaDeviceInfo>;
  audioInput: Optional<MediaDeviceInfo>;
  audioOutput: Optional<MediaDeviceInfo>;

}
