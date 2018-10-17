import {ActionHandler, ReflectiveReducer} from "redux-cbd";

import {ChangeSelectedMediaDevicesAction} from "./actions";
import {SourceState} from "./SourceState";

export class SourceReducer extends ReflectiveReducer<SourceState> {

  @ActionHandler
  public handleSelectedMediaDevicesChange(state: SourceState, action: ChangeSelectedMediaDevicesAction) {
    const newState = { ...state };

    newState.selectedDevices = {
      audioInput: action.payload.audioInput,
      videoInput: action.payload.videoInput
    };

    return newState;
  }

}
