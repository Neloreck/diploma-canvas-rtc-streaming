import {ReactContextManager} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";

import {Optional} from "@Lib/ts/type";

import {IInputSourceDevices} from "@Module/stream/data/store/source/models/IInputSourceDevices";

export interface ISourceContextState {
  sourceActions: {
    updateInputStreamAndSources: (stream: MediaStream, devices: IInputSourceDevices) => void;
  };
  sourceState: {
    inputStream: Optional<MediaStream>;
    outputStream: Optional<MediaStream>;
    selectedDevices: IInputSourceDevices;
  };
}

export class SourceContext extends ReactContextManager<ISourceContextState> {

  protected state: ISourceContextState = {
    sourceActions: {
      updateInputStreamAndSources: this.updateStreamAndSources,
    },
    sourceState: {
      inputStream: null,
      outputStream: null,
      selectedDevices: {
        audioInput: null,
        videoInput: null
      }
    }
  };

  @Bind()
  protected updateStreamAndSources(inputStream: MediaStream, selectedDevices: IInputSourceDevices): void {
    this.state.sourceState = { ...this.state.sourceState, inputStream, selectedDevices };
    this.update();
  }

}
