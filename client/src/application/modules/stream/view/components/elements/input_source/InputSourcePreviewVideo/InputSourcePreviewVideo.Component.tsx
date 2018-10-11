import * as React from "react";
import {Component} from "react";

import {Grid} from "@material-ui/core";

import {Styled} from "@Lib/react_lib/@material_ui";
import {Optional} from "@Lib/ts/type";

import {CanvasGraphicsPreprocessor} from "@Lib/react_lib/canvas_video_graphics";
import {CanvasGraphicsRenderObject} from "@Lib/react_lib/canvas_video_graphics/rendering/graphics_objects";
import {MovableRectangleMRO} from "@Lib/react_lib/canvas_video_graphics/rendering/graphics_objects/movable/util/MovableRectangleMRO";
import {MovableRingMRO} from "@Lib/react_lib/canvas_video_graphics/rendering/graphics_objects/movable/util/MovableRingMRO";

import {LocalMediaService} from "@Module/stream/data/services/local_media";

import {IInputSourcePreviewVideoProps} from "./InputSourcePreviewVideo.StateProps";
import {inputSourcePreviewVideoStyle} from "./InputSourcePreviewVideo.Style";

@Styled(inputSourcePreviewVideoStyle)
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

    const renderObjects: Array<CanvasGraphicsRenderObject> = [
      new MovableRingMRO(5, { x: 50, y: 50 }),
      new MovableRingMRO(8, { x: 25, y: 50 }),
      new MovableRingMRO(4, { x: 88, y: 13 }),
      new MovableRectangleMRO(10, 25, 25, 15),
      new MovableRectangleMRO(50, 65, 33, 25)
    ];

    return (
      <Grid className={this.props.classes.root} justify={"center"} alignItems={"center"} container>
        <CanvasGraphicsPreprocessor stream={this.state.previewStream}
                                    enableGridConfiguration={true}
                                    gridConfigObjects={renderObjects}/>
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
