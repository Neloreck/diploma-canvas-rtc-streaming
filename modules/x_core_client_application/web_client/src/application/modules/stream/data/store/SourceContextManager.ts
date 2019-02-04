import {ReactContextManager} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";

// Lib.
import {IInputSourceDevices, MediaUtils} from "@Lib/media";
import {Optional} from "@Lib/ts/types";
import {Logger} from "@Lib/utils";

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

  public context: ISourceContext = {
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

  private log: Logger = new Logger("[💥C-SRC]", true);

  // Injectable:

  @Bind()
  public async onOutputChanged(stream: Optional<MediaStream>): Promise<void>  { /* Injectable. */}

  @Bind()
  public async onInputChanged(stream: Optional<MediaStream>): Promise<void> { /* Injectable. */ }

  // Actions:

  @Bind()
  public setAudioCapturing(captureAudio: boolean): void {

    if (this.context.sourceState.inputStream) {
      MediaUtils.setStreamAudioEnabled(this.context.sourceState.inputStream, captureAudio);
    }

    this.updateStateRef();
    this.context.sourceState.captureAudio = captureAudio;
    this.update();
  }

  @Bind()
  public setVideoCapturing(captureVideo: boolean): void {
    this.context.sourceState = { ...this.context.sourceState, captureVideo };
    this.update();
  }

  @Bind()
  public updateInputSources(selectedDevices: IInputSourceDevices): void {
    this.updateStateRef();
    this.context.sourceState.selectedDevices = selectedDevices;
    this.update();
  }

  @Bind()
  public updateInputStreamAndSources(inputStream: MediaStream, selectedDevices: IInputSourceDevices): void {

    this.updateStateRef();

    const oldStream: Optional<MediaStream> = this.context.sourceState.inputStream;

    if (oldStream && inputStream) {
      MediaUtils.moveTracks(oldStream, inputStream);
    } else {
      MediaUtils.killStream(oldStream);
      this.context.sourceState.inputStream = inputStream;
    }

    this.context.sourceState.selectedDevices = selectedDevices;

    this.onInputChanged(this.context.sourceState.inputStream).then();
    this.update();
  }

  @Bind()
  public updateOutputStream(outputStream: Optional<MediaStream>): void {
    this.updateStateRef();
    this.context.sourceState.outputStream = outputStream;
    this.update();

    this.onOutputChanged(this.context.sourceState.outputStream).then();
  }

  @Bind()
  public updateInputStream(inputStream: Optional<MediaStream>): void {

    this.updateStateRef();

    const oldStream: Optional<MediaStream> = this.context.sourceState.inputStream;

    if (oldStream && inputStream) {
      MediaUtils.moveTracks(oldStream, inputStream);
    } else {
      MediaUtils.killStream(oldStream);
      this.context.sourceState.inputStream = inputStream;
    }

    this.onInputChanged(this.context.sourceState.inputStream).then();
    this.update();
  }

  // Utils:

  @Bind()
  public onProvisionEnded(): void {

    const {sourceState: state} = this.context;

    MediaUtils.killStream(state.inputStream);
    MediaUtils.killStream(state.outputStream);

    state.inputStream = null;
    state.outputStream = null;

    this.log.info("Disposed source storage.");
  }

  @Bind()
  private updateStateRef(): void {
    this.context.sourceState = Object.assign({}, this.context.sourceState);
  }

}
