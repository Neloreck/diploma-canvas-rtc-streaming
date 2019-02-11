import * as React from "react";
import { createRef, PureComponent, ReactNode, RefObject } from "react";

// Props.
export interface IDomVideoProps {
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
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

  public render(): ReactNode {

    const { width, height, muted, autoPlay } = this.props;

    const style: object = {
      height: height !== undefined ? height + "px" : undefined,
      width: width !== undefined ? width + "px" : undefined
    };

    return (
      <video className={this.props.className} ref={this.videoElementRef} style={style} muted={muted} autoPlay={autoPlay}/>
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
