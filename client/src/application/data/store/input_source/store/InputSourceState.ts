import {IInputSourceDevices} from "./IInputSourceDevices";

export class InputSourceState {

  public streamMedia: boolean = false;

  public selectedDevices: IInputSourceDevices = {
    audioInput: null,
    audioOutput: null,
    videoInput: null
  };

}
