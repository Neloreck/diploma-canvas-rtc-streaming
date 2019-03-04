import { Bind } from "dreamstate";
import * as React from "react";
import { Component, createRef, Fragment, MouseEvent, ReactNode, RefObject } from "react";
import ReactResizeDetector from "react-resize-detector";

// Lib.
import { AbstractCanvasGraphicsRenderObject, CommonRenderingService, IPoint } from "@Lib/graphics";
import { killStream } from "@Lib/media";
import { DomVideo } from "@Lib/react_lib/components";
import { Optional } from "@Lib/ts/types";
import { Logger, recalculateToRatio } from "@Lib/utils";

// Data.
import { applicationConfig } from "@Main/data/configs/ApplicationConfig";

// View.
import "../canvasStyling.scss";

// Props.
export interface ICanvasGraphicsSingleObjectRendererState {
  videoSizing: { width?: number, height?: number };
}

export interface ICanvasGraphicsSingleObjectRendererOwnProps {
  object: AbstractCanvasGraphicsRenderObject<any>;
}

export interface ICanvasGraphicsSingleObjectRendererExternalProps {}
export interface ICanvasGraphicsSingleObjectRendererProps extends ICanvasGraphicsSingleObjectRendererOwnProps, ICanvasGraphicsSingleObjectRendererExternalProps {}

export class CanvasGraphicsSingleObjectRenderer
  extends Component<ICanvasGraphicsSingleObjectRendererProps, ICanvasGraphicsSingleObjectRendererState> {

  public state: ICanvasGraphicsSingleObjectRendererState = {
    videoSizing: {
      height: undefined,
      width: undefined
    }
  };

  private readonly ASPECT_RATIO: number = applicationConfig.VIDEO.DEFAULT_SCALE;
  private readonly OUTPUT_FRAME_RATE: number = applicationConfig.VIDEO.DEFAULT_CAPTURING_FRAMERATE;

  private readonly log: Logger = new Logger("[🎸RDR]", true);
  private readonly videoContainerRef: RefObject<HTMLDivElement> = createRef();

  /*
   * Rendering services.
   */

  private internalStream: Optional<MediaStream> = null;

  private readonly renderingService: CommonRenderingService = new CommonRenderingService();

  /*
   * Lifecycle:
  */

  public componentWillMount(): void {

    this.renderingService.setRenderObjects([ this.props.object ]);
    this.renderingService.enableRendering();
    this.renderingService.disableInteraction();
    this.renderingService.enableContextCleanup();
    this.renderingService.render();

    this.internalStream = this.renderingService.getMediaStream(this.OUTPUT_FRAME_RATE);
  }

  public componentDidUpdate(): void {
    this.renderingService.setRenderObjects([this.props.object]);
  }

  public componentWillUnmount(): void {

    this.renderingService.disableRendering();

    this.log.info("Cleanup streams.");

    killStream(this.internalStream);
    this.internalStream = null;
  }

  /*
   * Rendering.
   */

  public render(): ReactNode {

    const { videoSizing } = this.state;

    return (
      <Fragment>

        <div
          ref={this.videoContainerRef}
          className={"canvas-renderer-layout"}
        >
          <DomVideo
            stream={this.internalStream}
            width={videoSizing.width}
            height={videoSizing.height}
            muted={true}
            autoPlay={true}
          />
        </div>

        <ReactResizeDetector
          handleHeight handleWidth
          onResize={this.resize}
        />

      </Fragment>
    );
  }

  /*
   * Handle DOM events:
   */

  @Bind()
  public getPercentageMouseEventCoordinate(event: MouseEvent): IPoint {

    const clientRect: ClientRect = ((this.videoContainerRef.current as HTMLDivElement).firstChild as HTMLVideoElement).getBoundingClientRect();

    const newX: number = (event.pageX - clientRect.left) * 100 / clientRect.width;
    const newY: number = (event.pageY - clientRect.top) * 100 / clientRect.height;

    return {
      x: newX > 100 ? 100 : (newX < 0 ? 0 : newX),
      y: newY > 100 ? 100 : (newY < 0 ? 0 : newY)
    };
  }

  /*
   * Sizing related:
   */

  @Bind()
  public resize(width: number, height: number): void {

    this.setState({
      videoSizing: recalculateToRatio(width, height, this.ASPECT_RATIO)
    });
  }

}
