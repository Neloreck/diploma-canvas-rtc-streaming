import * as React from "react";
import {createRef, PureComponent, RefObject} from "react";

// Props.
export interface IDomVideoProps {
  className?: string;
  width?: number;
  height?: number;
  stream: MediaStream | null;
}

export class DomVideo extends PureComponent<IDomVideoProps> {

  private videoElementRef: RefObject<HTMLVideoElement> = createRef();

  public componentWillMount(): void {
    this.setVideoSource(this.props.stream);
  }

  public componentWillReceiveProps(nextProps: IDomVideoProps): void {
    if (nextProps.stream !== this.props.stream) {
      this.setVideoSource(nextProps.stream);
    }
  }

  public render(): JSX.Element {

    const {width, height} = this.props;

    const style = {
      height: height !== undefined ? height + "px" : undefined,
      width: width !== undefined ? width + "px" : undefined
    };

    return (
      <video className={this.props.className} ref={this.videoElementRef} style={style} autoPlay/>
    );
  }

  private setVideoSource(stream: MediaStream | null): void {

    setTimeout(() => {
      const videoElement: HTMLVideoElement | null = this.videoElementRef.current;

      if (videoElement) {
        videoElement.srcObject = null;
        videoElement.srcObject = stream;
      }
    });
  }

}
