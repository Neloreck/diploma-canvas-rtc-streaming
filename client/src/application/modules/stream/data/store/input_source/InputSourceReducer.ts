import {ActionHandler, ReflectiveReducer} from "redux-cbd";

import {ChangeSelectedMediaDevicesAction} from "./actions";
import {InputSourceState} from "./InputSourceState";

export class InputSourceReducer extends ReflectiveReducer<InputSourceState> {

  @ActionHandler
  public handleSelectedMediaDevicesChange(state: InputSourceState, action: ChangeSelectedMediaDevicesAction) {
    const newState = { ...state };

    newState.selectedDevices = {
      audioInput: action.payload.audioInput,
      videoInput: action.payload.videoInput
    };

    return newState;
  }

}
