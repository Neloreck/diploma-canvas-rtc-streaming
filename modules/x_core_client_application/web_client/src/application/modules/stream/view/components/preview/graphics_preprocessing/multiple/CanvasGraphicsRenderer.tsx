import { Bind, Consume } from "dreamstate";
import * as React from "react";
import { Component, createRef, Fragment, MouseEvent, ReactNode, RefObject } from "react";
import { default as ReactResizeDetector } from "react-resize-detector";

// Lib.
import {
  AbstractCanvasGraphicsRenderObject, CommonRenderingService, ERenderingServiceEvent, IGraphicsRendererReactComponent, IPoint
} from "@Lib/graphics";
import { killStream } from "@Lib/media";
import { DomVideo } from "@Lib/react_lib/components";
import { Optional } from "@Lib/ts/types";
import { Logger, recalculateToRatio } from "@Lib/utils";

// Data.
import { applicationConfig } from "@Main/data/configs/ApplicationConfig";
import {
  graphicsContextManager,
  IGraphicsContext,
  IRenderingContext,
  renderingContextManager
} from "@Module/stream/data/store";

// View.
import "../canvasStyling.scss";

// Props.
export interface ICanvasGraphicsRendererState {
  videoSizing: { width?: number, height?: number };
}

export interface ICanvasGraphicsRendererOwnProps {
  onOutputStreamReady: (stream: Optional<MediaStream>) => void;
  previewMode: boolean;
  internalRenderingItems: Array<AbstractCanvasGraphicsRenderObject<any>>;
  externalRenderingItems: Array<AbstractCanvasGraphicsRenderObject<any>>;
}

export interface ICanvasGraphicsRendererExternalProps extends IGraphicsContext, IRenderingContext {}
export interface ICanvasGraphicsRendererProps extends ICanvasGraphicsRendererOwnProps, ICanvasGraphicsRendererExternalProps {}

@Consume(graphicsContextManager, renderingContextManager)
export class CanvasGraphicsRenderer
  extends Component<ICanvasGraphicsRendererProps, ICanvasGraphicsRendererState> implements IGraphicsRendererReactComponent {

  public state: ICanvasGraphicsRendererState = {
    videoSizing: { width: undefined, height: undefined }
  };

  private readonly ASPECT_RATIO: number = applicationConfig.VIDEO.DEFAULT_SCALE;
  private readonly OUTPUT_FRAME_RATE: number = applicationConfig.VIDEO.DEFAULT_CAPTURING_FRAMERATE;

  private readonly log: Logger = new Logger("[🎸RDR]", true);
  private readonly videoContainerRef: RefObject<HTMLDivElement> = createRef();

  /*
   * Rendering services.
   */

  private internalStream: Optional<MediaStream> = null;

  private readonly internalRenderingService: CommonRenderingService = new CommonRenderingService();
  private readonly externalRenderingService: CommonRenderingService = new CommonRenderingService();

  // Constructing.

  public constructor(props: ICanvasGraphicsRendererProps) {
    super(props);

    // Handlers for outside emitting.
    this.attachServiceHandlers();
  }

  /*
   * Lifecycle:
  */

  public componentWillMount(): void {

    // Enable rendering.
    this.internalRenderingService.setRenderObjects(this.props.internalRenderingItems);
    this.externalRenderingService.setRenderObjects(this.props.externalRenderingItems);

    this.internalRenderingService.enableRendering();
    this.externalRenderingService.enableRendering();

    if (this.props.previewMode) {
      this.internalRenderingService.disableInteraction();
    } else {
      this.internalRenderingService.enableInteraction();
    }

    this.internalRenderingService.disableContextCleanup();
    this.externalRenderingService.disableInteraction();
    this.externalRenderingService.disableContextCleanup();

    this.internalRenderingService.render();
    this.externalRenderingService.render();

    // Expose streams:
    this.props.onOutputStreamReady(this.externalRenderingService.getMediaStream(this.OUTPUT_FRAME_RATE));
    this.internalStream = this.internalRenderingService.getMediaStream(this.OUTPUT_FRAME_RATE);
  }

  public componentWillReceiveProps(nextProps: ICanvasGraphicsRendererProps): void {
    // Selected object from application.
    if (nextProps.graphicsState.selectedObject !== this.internalRenderingService.getSelectedObject()) {
      this.internalRenderingService.setSelectedObject(nextProps.graphicsState.selectedObject);
    }

    // Apply render changes.
    if (nextProps.graphicsState.objects !== this.props.graphicsState.objects) {
      this.internalRenderingService.setRenderObjects(nextProps.graphicsState.objects);
      this.externalRenderingService.setRenderObjects(nextProps.graphicsState.objects);
    }
  }

  public componentDidUpdate(): void {

    if (this.props.previewMode) {
      this.internalRenderingService.disableInteraction();
    } else {
      this.internalRenderingService.enableInteraction();
    }

    this.internalRenderingService.setRenderObjects(this.props.internalRenderingItems);
    this.externalRenderingService.setRenderObjects(this.props.externalRenderingItems);
  }

  public componentWillUnmount(): void {

    this.internalRenderingService.disableRendering();
    this.externalRenderingService.disableRendering();

    this.log.info("Cleanup streams.");

    this.props.onOutputStreamReady(null);
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
          onMouseMove={this.handleLayoutMouseMove}
          onMouseEnter={this.handleLayoutMouseEnter}
          onMouseLeave={this.handleLayoutMouseLeave}
          onMouseDown={this.handleLayoutMouseDown}
          onMouseUp={this.handleLayoutMouseUp}
          onContextMenu={this.handleContextDown}
        >
          {this.props.children}
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
  public handleContextDown(event: MouseEvent): void {
    event.preventDefault();
    this.internalRenderingService.handleContextDown(this.getPercentageMouseEventCoordinate(event));
  }

  @Bind()
  public handleLayoutMouseDown(event: MouseEvent): void {
    this.internalRenderingService.handleMouseDown(this.getPercentageMouseEventCoordinate(event));
  }

  @Bind()
  public handleLayoutMouseUp(event: MouseEvent): void {
    this.internalRenderingService.handleMouseUp(this.getPercentageMouseEventCoordinate(event));
  }

  @Bind()
  public handleLayoutMouseMove(event: MouseEvent): void {
    this.internalRenderingService.handleMouseMove(this.getPercentageMouseEventCoordinate(event));
  }

  @Bind()
  public handleLayoutMouseEnter(event: MouseEvent): void {
    this.internalRenderingService.handleMouseEnter(this.getPercentageMouseEventCoordinate(event));
  }

  @Bind()
  public handleLayoutMouseLeave(event: MouseEvent): void {
    this.internalRenderingService.handleMouseLeave(this.getPercentageMouseEventCoordinate(event));
  }

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
    this.setState({ videoSizing: recalculateToRatio(width, height, this.ASPECT_RATIO) });
  }

  /*
   * Service events related methods:
   */

  @Bind()
  public onRenderingObjectSelected(object: Optional<AbstractCanvasGraphicsRenderObject<any>>): void {

    const { renderingState: { propagateRendererEvents }, graphicsActions: { selectObject } } = this.props;

    if (propagateRendererEvents) {
      selectObject(object);
    }
  }

  @Bind()
  public onRenderingObjectRemove(object: Optional<AbstractCanvasGraphicsRenderObject<any>>): void {

    const { renderingState: { propagateRendererEvents }, graphicsActions: { removeObject } } = this.props;

    if (!object) {
      throw new Error("Unexpected object removal. Got null.");
    }

    if (propagateRendererEvents) {
      removeObject(object);
    }
  }

  @Bind()
  private attachServiceHandlers(): void {

    this.internalRenderingService.addEventListener(ERenderingServiceEvent.OBJECT_SELECTED, this.onRenderingObjectSelected);
    this.internalRenderingService.addEventListener(ERenderingServiceEvent.OBJECT_REMOVE, this.onRenderingObjectRemove);
  }

}
