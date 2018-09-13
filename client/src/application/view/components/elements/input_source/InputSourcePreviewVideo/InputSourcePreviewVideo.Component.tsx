import * as React from "react";
import {Component} from "react";

import {Grid} from "@material-ui/core";

import {withStyle} from "@Annotate";
import {Optional} from "@Lib/type/Optional";

import {IInputSourcePreviewVideoProps} from "./InputSourcePreviewVideo.StateProps";
import {inputSourcePreviewVideoStyle} from "./InputSourcePreviewVideo.Style";

import {LocalMediaService} from "@App/data/services/local_media";

import {CanvasGraphicsPreprocessor} from "@Lib/canvas_video_graphics";

@withStyle(inputSourcePreviewVideoStyle)
export class InputSourcePreviewVideo extends Component<IInputSourcePreviewVideoProps> {

  public readonly state = {
    previewStream: new MediaStream()
  };

  private localMediaService: LocalMediaService = new LocalMediaService();

  public componentDidMount(): void {
    if (this.props.sources.videoInput) {
      this.fillTracksFromDevice(this.props.sources.videoInput);
    }
  }

  public componentWillUnmount(): void {
    this.killCurrentTracks();
  }

  public componentDidUpdate(prevProps: IInputSourcePreviewVideoProps) {

    const currentProps: IInputSourcePreviewVideoProps = this.props;

    const prevVideoSource: Optional<MediaDeviceInfo> = prevProps.sources.videoInput;
    const curVideoSource: MediaDeviceInfo = currentProps.sources.videoInput as MediaDeviceInfo ;

    if (curVideoSource === null && prevVideoSource !== null) {
      this.killCurrentTracks();
    } else if (curVideoSource !== null && (prevVideoSource === null || prevVideoSource.deviceId !== curVideoSource.deviceId)) {
      this.killCurrentTracks();
      this.fillTracksFromDevice(curVideoSource);
    }
  }

  public render(): JSX.Element {
    return (
      <Grid className={this.props.classes.root} justify={"center"} alignItems={"center"} container>
        <CanvasGraphicsPreprocessor animate={true} stream={this.state.previewStream}/>
      </Grid>
    );
  }

  private async fillTracksFromDevice(device: MediaDeviceInfo) {
    const mediaStream: MediaStream = await this.localMediaService.getUserMedia(null, device);
    this.setState({ ...this.state, previewStream: mediaStream } );
  }

  private killCurrentTracks(): void {
    this.state.previewStream.getTracks().forEach((track: MediaStreamTrack) => {
      track.stop();
      this.state.previewStream.removeTrack(track);
    });
  }

}
