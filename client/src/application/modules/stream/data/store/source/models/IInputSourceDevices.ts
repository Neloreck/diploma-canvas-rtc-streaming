import {Optional} from "../../../../../../lib/ts/type/Optional";

export interface IInputSourceDevices {
  videoInput: Optional<MediaDeviceInfo>;
  audioInput: Optional<MediaDeviceInfo>;
}
