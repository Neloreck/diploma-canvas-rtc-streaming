import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Component, createRef, Fragment, MouseEvent, ReactNode, RefObject} from "react";
import ReactResizeDetector from "react-resize-detector";

// Lib.
import {AbstractCanvasGraphicsRenderObject, CommonRenderingService, IPoint} from "@Lib/graphics";
import {MediaUtils} from "@Lib/media";
import {DomVideo} from "@Lib/react_lib/components";
import {Optional} from "@Lib/ts/types";
import {DomSizingUtils, Logger} from "@Lib/utils";

// Data.
import {applicationConfig} from "@Main/data/configs";

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

  public state = {
    videoSizing: { width: undefined, height: undefined }
  };

  private readonly ASPECT_RATIO: number = applicationConfig.defaultVideoScale;
  private readonly OUTPUT_FRAME_RATE: number = applicationConfig.defaultVideoCapturingFramerate;

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

    this.renderingService.setRenderObjects([this.props.object]);
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

    MediaUtils.killStream(this.internalStream);
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
          <DomVideo stream={this.internalStream} width={videoSizing.width} height={videoSizing.height} muted={true} autoPlay={true}/>
        </div>

        <ReactResizeDetector
          onResize={this.resize}
          handleHeight handleWidth
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

    const newX: number = (event.pageX - clientRect.left)  * 100 / clientRect.width;
    const newY: number = (event.pageY - clientRect.top) * 100 / clientRect.height;

    return { x: newX > 100 ? 100 : (newX < 0 ? 0 : newX), y: newY > 100 ? 100 : (newY < 0 ? 0 : newY) };
  }

  /*
   * Sizing related:
   */

  @Bind()
  public resize(width: number, height: number): void {
    this.setState({ videoSizing: DomSizingUtils.recalculateToRatio(width, height, this.ASPECT_RATIO) });
  }

}
