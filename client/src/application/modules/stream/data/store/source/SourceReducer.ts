import {ActionHandler, ReflectiveReducer} from "@redux-cbd/core";

import {ChangeSelectedMediaDevicesAction, UpdateInputStreamAndSourcesAction} from "./actions";
import {SourceState} from "./SourceState";

export class SourceReducer extends ReflectiveReducer<SourceState> {

  @ActionHandler()
  public handleSelectedMediaDevicesChange(state: SourceState, action: ChangeSelectedMediaDevicesAction): SourceState {
    const newState = { ...state };

    newState.selectedDevices = {
      audioInput: action.payload.audioInput,
      videoInput: action.payload.videoInput
    };

    return newState;
  }

  @ActionHandler()
  public handleSourceStreamAndInputsChange(state: SourceState, action: UpdateInputStreamAndSourcesAction): SourceState {
    return { ...state, inputStream: action.payload.stream, selectedDevices: action.payload.devices };
  }

}
