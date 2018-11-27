import * as React from "react";
import {createRef, PureComponent, RefObject} from "react";

// Lib.
import {Optional} from "@Lib/ts/type";

// Props.
export interface IVideoPreviewProps {
  className?: string;
  stream: Optional<MediaStream>;
}

export class VideoPreview extends PureComponent<IVideoPreviewProps> {

  private videoElementRef: RefObject<HTMLVideoElement> = createRef();

  public componentWillMount(): void {
    this.setVideoSource(this.props.stream);
  }

  public componentDidUpdate(prevProps: IVideoPreviewProps): void {

    if (prevProps.stream !== this.props.stream) {
      this.setVideoSource(this.props.stream);
    }
  }

  public render(): JSX.Element {
    return (
      <video className={this.props.className} ref={this.videoElementRef} autoPlay/>
    );
  }

  private setVideoSource(stream: Optional<MediaStream>): void {

    const videoElement: Optional<HTMLVideoElement> = this.videoElementRef.current;

    if (videoElement) {
      videoElement.srcObject = null;
      videoElement.srcObject = stream;
    }
  }

}
