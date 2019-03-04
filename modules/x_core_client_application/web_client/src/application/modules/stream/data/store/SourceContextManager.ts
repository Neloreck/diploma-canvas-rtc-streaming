import { Bind, ContextManager } from "dreamstate";

// Lib.
import { IInputSourceDevices, killStream, moveTracks, setStreamAudioEnabled } from "@Lib/media";
import { Optional } from "@Lib/ts/types";
import { Logger } from "@Lib/utils";

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

export class SourceContextManager extends ContextManager<ISourceContext> {

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

  private readonly setState = ContextManager.getSetter(this, "sourceState");
  private readonly log: Logger = new Logger("[💥C-SRC]", true);

  // Getters.

  // Injectable.

  @Bind()
  public async onOutputChanged(stream: Optional<MediaStream>): Promise<void>  { /* Injectable. */}

  @Bind()
  public async onInputChanged(stream: Optional<MediaStream>): Promise<void> { /* Injectable. */ }

  // Actions.

  @Bind()
  public setAudioCapturing(captureAudio: boolean): void {

    const { sourceState: { inputStream } } = this.context;

    if (inputStream) {
      setStreamAudioEnabled(inputStream, captureAudio);
    }

    this.setState({ captureAudio });
  }

  @Bind()
  public setVideoCapturing(captureVideo: boolean): void {
    this.setState({ captureVideo });
  }

  @Bind()
  public updateInputSources(selectedDevices: IInputSourceDevices): void {
    this.setState({ selectedDevices });
  }

  @Bind()
  public updateInputStreamAndSources(inputStream: MediaStream, selectedDevices: IInputSourceDevices): void {

    const state = Object.assign({}, this.context.sourceState);
    const oldStream: Optional<MediaStream> = state.inputStream;

    if (oldStream && inputStream) {
      moveTracks(oldStream, inputStream);
    } else {
      killStream(oldStream);
      state.inputStream = inputStream;
    }

    state.selectedDevices = selectedDevices;

    this.setState(state);

    this.onInputChanged(state.inputStream).then();
  }

  @Bind()
  public updateOutputStream(outputStream: Optional<MediaStream>): void {

    this.setState({ outputStream });

    this.onOutputChanged(this.context.sourceState.outputStream).then();
  }

  @Bind()
  public updateInputStream(inputStream: Optional<MediaStream>): void {

    const state = Object.assign({}, this.context.sourceState);
    const oldStream: Optional<MediaStream> = state.inputStream;

    if (oldStream && inputStream) {
      moveTracks(oldStream, inputStream);
    } else {
      killStream(oldStream);
      state.inputStream = inputStream;
    }

    this.onInputChanged(state.inputStream).then();
    this.setState(state);
  }

  // Lifecycle:

  @Bind()
  protected onProvisionEnded(): void {

    const { sourceState: state } = this.context;

    killStream(state.inputStream);
    killStream(state.outputStream);

    state.inputStream = null;
    state.outputStream = null;

    this.log.info("Disposed source storage.");
  }

}
