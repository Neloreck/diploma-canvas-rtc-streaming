import {ReactContextManager} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";

import {Optional} from "@Lib/ts/types";
import {Logger} from "@Lib/utils";

import {localMediaService} from "@Module/stream/data/services/local_media";
import {IInputSourceDevices} from "@Module/stream/data/store/source/models/IInputSourceDevices";

export interface ISourceContext {
  sourceActions: {
    // Stream updates.
    updateInputStreamAndSources(stream: MediaStream, devices: IInputSourceDevices): void;
    updateInputSources(devices: IInputSourceDevices): void;
    updateInputStream(stream: Optional<MediaStream>): void;
    updateOutputStream(stream: Optional<MediaStream>): void;
    // Capturing switching.
    setAudioCapturing(capture: boolean): void;
    setVideoCapturing(capture: boolean): void;
  };
  sourceState: {
    captureVideo: boolean;
    captureAudio: boolean;
    inputStream: Optional<MediaStream>;
    outputStream: Optional<MediaStream>;
    selectedDevices: IInputSourceDevices;
  };
}

export class SourceContextManager extends ReactContextManager<ISourceContext> {

  protected context: ISourceContext = {
    sourceActions: {
      setAudioCapturing: this.setAudioCapturing,
      setVideoCapturing: this.setVideoCapturing,
      updateInputSources: this.updateInputSources,
      updateInputStream: this.updateInputStream,
      updateInputStreamAndSources: this.updateInputStreamAndSources,
      updateOutputStream: this.updateOutputStream,
    },
    sourceState: {
      captureAudio: true,
      captureVideo: true,
      inputStream: null,
      outputStream: null,
      selectedDevices: {
        audioInput: null,
        videoInput: null
      }
    }
  };

  private log: Logger = new Logger("[💥SRC]", true);

  @Bind()
  public dispose(): void {

    const state = this.context.sourceState;

    localMediaService.killStream(state.inputStream);
    localMediaService.killStream(state.outputStream);

    state.inputStream = null;
    state.outputStream = null;

    this.log.info("Disposed source storage.");
  }

  // Actions:

  @Bind()
  protected setAudioCapturing(captureAudio: boolean): void {

    if (this.context.sourceState.inputStream) {
      localMediaService.setStreamAudioEnabled(this.context.sourceState.inputStream, captureAudio);
    }

    this.updateStateRef();
    this.context.sourceState.captureAudio = captureAudio;
    this.update();
  }

  @Bind()
  protected setVideoCapturing(captureVideo: boolean): void {
    this.context.sourceState = { ...this.context.sourceState, captureVideo };
    this.update();
  }

  @Bind()
  protected updateInputSources(selectedDevices: IInputSourceDevices): void {
    this.updateStateRef();
    this.context.sourceState.selectedDevices = selectedDevices;
    this.update();
  }
  @Bind()
  protected updateInputStreamAndSources(inputStream: MediaStream, selectedDevices: IInputSourceDevices): void {
    this.updateStateRef();
    localMediaService.killStream(this.context.sourceState.inputStream);
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
  protected updateInputStream(inputStream: Optional<MediaStream>): void {
    this.updateStateRef();
    localMediaService.killStream(this.context.sourceState.inputStream);
    this.context.sourceState.inputStream = inputStream;
    this.update();
  }

  @Bind()
  protected updateStateRef(): void {
    this.context.sourceState = Object.assign({}, this.context.sourceState);
  }

}
