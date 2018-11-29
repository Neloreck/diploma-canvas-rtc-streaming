import {ReactContextManager} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";

import {Optional} from "@Lib/ts/type";

import {IInputSourceDevices} from "@Module/stream/data/store/source/models/IInputSourceDevices";

export interface ISourceContext {
  sourceActions: {
    updateInputStreamAndSources: (stream: MediaStream, devices: IInputSourceDevices) => void;
    updateInputSources: (devices: IInputSourceDevices) => void;
    updateOutputStream: (stream: Optional<MediaStream>) => void;
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
      updateInputStreamAndSources: this.updateStreamAndSources,
      updateOutputStream: this.updateOutputStream
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
    this.updateStateRef();
    this.context.sourceState.selectedDevices = selectedDevices;
    this.update();
  }

  @Bind()
  protected updateStreamAndSources(inputStream: MediaStream, selectedDevices: IInputSourceDevices): void {
    this.updateStateRef();
    this.context.sourceState.inputStream = inputStream;
    this.context.sourceState.selectedDevices = selectedDevices;
    this.update();
  }

  @Bind()
  protected updateOutputStream(outputStream: Optional<MediaStream>): void {
    this.updateStateRef();
    this.context.sourceState.outputStream = outputStream;
    this.update();
  }

  @Bind()
  protected updateStateRef(): void {
    this.context.sourceState = Object.assign({}, this.context.sourceState);
  }

}
