import {Optional} from "../../../../../../lib/type/Optional";

export interface IInputSourceDevices {

  videoInput: Optional<MediaDeviceInfo>;
  audioInput: Optional<MediaDeviceInfo>;
  audioOutput: Optional<MediaDeviceInfo>;

}
