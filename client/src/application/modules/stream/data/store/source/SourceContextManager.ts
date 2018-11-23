import {ReactContextManager} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";

import {Optional} from "@Lib/ts/type";

import {IInputSourceDevices} from "@Module/stream/data/store/source/models/IInputSourceDevices";

export interface ISourceContext {
  sourceActions: {
    updateInputStreamAndSources: (stream: MediaStream, devices: IInputSourceDevices) => void;
    updateInputSources: (devices: IInputSourceDevices) => void;
  };
  sourceState: {
    inputStream: Optional<MediaStream>;
    outputStream: Optional<MediaStream>;
    selectedDevices: IInputSourceDevices;
  };
}

export class SourceContextManager extends ReactContextManager<ISourceContext> {

  protected context: ISourceContext = {
    sourceActions: {
      updateInputSources: this.updateInputSources,
      updateInputStreamAndSources: this.updateStreamAndSources
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
  protected updateInputSources(selectedDevices: IInputSourceDevices): void {
    this.context.sourceState = { ...this.context.sourceState, selectedDevices };
    this.update();
  }

  @Bind()
  protected updateStreamAndSources(inputStream: MediaStream, selectedDevices: IInputSourceDevices): void {
    this.context.sourceState = { ...this.context.sourceState, inputStream, selectedDevices };
    this.update();
  }

}
