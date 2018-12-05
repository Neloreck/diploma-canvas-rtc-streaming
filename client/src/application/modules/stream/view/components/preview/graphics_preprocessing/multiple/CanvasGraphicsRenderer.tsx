import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Component, createRef, Fragment, MouseEvent, RefObject} from "react";
import ReactResizeDetector from "react-resize-detector";

// Lib.
import {
  CanvasGraphicsRenderObject,
  CommonRenderingService,
  ERenderingServiceEvent, ICanvasGraphicsSizingContext, IPoint
} from "@Lib/graphics";
import {DomVideo} from "@Lib/react_lib/components";
import {Optional} from "@Lib/ts/type";
import {DomSizingUtils} from "@Lib/util/DomSizingUtils";
import {Logger} from "@Lib/util/logger";

// Data.
import {appConfig} from "@Main/config";
import {localMediaService} from "@Module/stream/data/services/local_media";
import {graphicsContextManager, IGraphicsContext} from "@Module/stream/data/store";

// View.
import "../canvasStyling.scss";

// Props.
export interface ICanvasGraphicsRendererState {
  videoSizing: { width?: number, height?: number };
}

export interface ICanvasGraphicsRendererOwnProps {
  onOutputStreamReady: (stream: Optional<MediaStream>) => void;
  previewMode: boolean;
  internalRenderingItems: Array<CanvasGraphicsRenderObject>;
  externalRenderingItems: Array<CanvasGraphicsRenderObject>;
}

export interface ICanvasGraphicsRendererExternalProps extends IGraphicsContext {}

export interface ICanvasGraphicsRendererProps extends ICanvasGraphicsRendererOwnProps, ICanvasGraphicsRendererExternalProps {}

@Consume<IGraphicsContext, ICanvasGraphicsRendererProps>(graphicsContextManager)
export class CanvasGraphicsRenderer extends Component<ICanvasGraphicsRendererProps, ICanvasGraphicsRendererState> {

  public state = {
    videoSizing: { width: undefined, height: undefined }
  };

  private log: Logger = new Logger("[CGR]", true);

  private videoContainerRef: RefObject<HTMLDivElement> = createRef();
  private internalStream: Optional<MediaStream> = null;

  private readonly ASPECT_RATIO: number = appConfig.defaultVideoScale;
  private readonly OUTPUT_FRAME_RATE: number = appConfig.defaultVideoCapturingFramerate;

  /* Rendering services. */
  private readonly internalRenderingService: CommonRenderingService = new CommonRenderingService();
  private readonly externalRenderingService: CommonRenderingService = new CommonRenderingService();

  constructor(props: ICanvasGraphicsRendererProps) {
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
    if (nextProps.graphicsState.selectedObject !== this.props.graphicsState.selectedObject) {
      this.internalRenderingService.setSelectedObject(nextProps.graphicsState.selectedObject);
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

    // todo: If still need it.
    this.log.info("Cleanup streams;");

    this.props.onOutputStreamReady(null);
    localMediaService.killStream(this.internalStream);
    this.internalStream = null;
  }

  public render(): JSX.Element {
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
          onContextMenu={this.handleContextMenu}
        >
          <DomVideo stream={this.internalStream} width={videoSizing.width} height={videoSizing.height}/>
        </div>

        <ReactResizeDetector
          onResize={this.resize}
          refreshMode={"throttle"}
          refreshRate={300}
          handleHeight handleWidth
        />

      </Fragment>
    );
  }

  /* SERVICE events related methods: */

  @Bind()
  private attachServiceHandlers(): void {
    this.internalRenderingService.addEventListener(ERenderingServiceEvent.OBJECT_SELECTED, this.onRenderingObjectSelected);
  }

  @Bind()
  private onRenderingObjectSelected(object: Optional<CanvasGraphicsRenderObject>): void {

    const {graphicsState: {propagateRendererEvents}, graphicsActions: {selectObject}} = this.props;

    if (propagateRendererEvents) {
      selectObject(object);
    }
  }

  /* DOM events related methods: */

  @Bind()
  private handleLayoutMouseDown(event: MouseEvent): void {
    this.internalRenderingService.handleMouseDown(this.getAbsoluteServiceMouseEventCoordinate(event));
  }

  @Bind()
  private handleContextMenu(event: MouseEvent): void {

    event.preventDefault();
    event.stopPropagation();

    this.internalRenderingService.setSelectedObject(null);
  }

  @Bind()
  private handleLayoutMouseUp(event: MouseEvent): void {
    this.internalRenderingService.handleMouseUp(this.getAbsoluteServiceMouseEventCoordinate(event));
  }

  @Bind()
  private handleLayoutMouseMove(event: MouseEvent): void {
    this.internalRenderingService.handleMouseMove(this.getAbsoluteServiceMouseEventCoordinate(event));
  }

  @Bind()
  private handleLayoutMouseEnter(event: MouseEvent): void {
    this.internalRenderingService.handleMouseEnter(this.getAbsoluteServiceMouseEventCoordinate(event));
  }

  @Bind()
  private handleLayoutMouseLeave(event: MouseEvent): void {
    this.internalRenderingService.handleMouseLeave(this.getAbsoluteServiceMouseEventCoordinate(event));
  }

  /* Sizing related methods: */

  @Bind()
  private resize(width: number, height: number): void {
    this.setState({ videoSizing: DomSizingUtils.recalculateToRatio(width, height, this.ASPECT_RATIO) });
  }

  private getAbsoluteServiceMouseEventCoordinate(event: MouseEvent): IPoint {

    // todo: Percentage.

    const clientRect: ClientRect = ((this.videoContainerRef.current as HTMLDivElement).firstChild as HTMLVideoElement).getBoundingClientRect();
    const contextSizing: ICanvasGraphicsSizingContext = this.internalRenderingService.getSizing();

    const absoluteX: number = (event.pageX - clientRect.left);
    const absoluteY: number = (event.pageY - clientRect.top);

    return { x: absoluteX * contextSizing.width / clientRect.width, y: absoluteY * contextSizing.height / clientRect.height };
  }

}
