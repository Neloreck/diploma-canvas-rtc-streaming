import {ActionHandler, ReflectiveReducer} from "redux-cbd";

import {InputSourceState} from "@Store/input_source/store/InputSourceState";

import {ChangeSelectedMediaDevicesAction} from "@Store/input_source/actions";

export class InputSourceReducer extends ReflectiveReducer<InputSourceState> {

  @ActionHandler
  public handleSelectedMediaDevicesChange(state: InputSourceState, action: ChangeSelectedMediaDevicesAction) {
    const newState = { ...state };

    newState.selectedDevices = {
      audioInput: action.payload.audioInput,
      audioOutput: action.payload.audioOutput,
      videoInput: action.payload.videoInput
    };

    return newState;
  }

}
