import {ActionWired, SimpleAction} from "redux-cbd";

import {IInputSourceDevices} from "../models/IInputSourceDevices";

@ActionWired("INPUT_SOURCE_CHANGE_MEDIA_DEVICES")
export class ChangeSelectedMediaDevicesAction extends SimpleAction {

  public readonly payload: IInputSourceDevices = { audioInput: null, audioOutput: null, videoInput: null };

  constructor(newInputSources: IInputSourceDevices) {
    super();

    this.payload.audioInput = newInputSources.audioInput;
    this.payload.audioOutput = newInputSources.audioOutput;
    this.payload.videoInput = newInputSources.videoInput;
  }

}
