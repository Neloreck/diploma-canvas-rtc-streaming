import * as React from "react";
import {createRef, PureComponent, RefObject} from "react";

// Props.
export interface IDomVideoProps {
  className?: string;
  stream: MediaStream | null;
}

export class DomVideo extends PureComponent<IDomVideoProps> {

  private videoElementRef: RefObject<HTMLVideoElement> = createRef();

  public componentWillMount(): void {
    this.setVideoSource(this.props.stream);
  }

  public componentDidUpdate(prevProps: IDomVideoProps): void {

    if (prevProps.stream !== this.props.stream) {
      this.setVideoSource(this.props.stream);
    }
  }

  public render(): JSX.Element {
    return (
      <video className={this.props.className} ref={this.videoElementRef} autoPlay/>
    );
  }

  private setVideoSource(stream: MediaStream | null): void {

    const videoElement: HTMLVideoElement | null = this.videoElementRef.current;

    if (videoElement) {
      videoElement.srcObject = null;
      videoElement.srcObject = stream;
    }
  }

}
