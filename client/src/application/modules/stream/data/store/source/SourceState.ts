import {Optional} from "@Lib/ts/type";

import {IInputSourceDevices} from "./models/IInputSourceDevices";

export class SourceState {

  public inputStream: Optional<MediaStream> = null;
  public outputStream: Optional<MediaStream> = null;

  public selectedDevices: IInputSourceDevices = {
    audioInput: null,
    videoInput: null
  };

}
