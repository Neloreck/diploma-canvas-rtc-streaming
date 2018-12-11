import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Component, createRef, Fragment, MouseEvent, RefObject} from "react";
import ReactResizeDetector from "react-resize-detector";

// Lib.
import {
  AbstractCanvasGraphicsRenderObject, CommonRenderingService, ERenderingServiceEvent, IGraphicsRendererReactComponent, IPoint
} from "@Lib/graphics";
import {DomVideo} from "@Lib/react_lib/components";
import {Optional} from "@Lib/ts/types";
import {DomSizingUtils, Logger} from "@Lib/utils";

// Data.
import {applicationConfig} from "@Main/data/config";
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
  internalRenderingItems: Array<AbstractCanvasGraphicsRenderObject>;
  externalRenderingItems: Array<AbstractCanvasGraphicsRenderObject>;
}

export interface ICanvasGraphicsRendererExternalProps extends IGraphicsContext {}

export interface ICanvasGraphicsRendererProps extends ICanvasGraphicsRendererOwnProps, ICanvasGraphicsRendererExternalProps {}

@Consume<IGraphicsContext, ICanvasGraphicsRendererProps>(graphicsContextManager)
export class CanvasGraphicsRenderer
  extends Component<ICanvasGraphicsRendererProps, ICanvasGraphicsRendererState> implements IGraphicsRendererReactComponent {

  public state = {
    videoSizing: { width: undefined, height: undefined }
  };

  private readonly ASPECT_RATIO: number = applicationConfig.defaultVideoScale;
  private readonly OUTPUT_FRAME_RATE: number = applicationConfig.defaultVideoCapturingFramerate;

  private readonly log: Logger = new Logger("[CGR]", true);
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
    if (nextProps.graphicsState.selectedObject !== this.props.graphicsState.selectedObject) {
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

    // todo: If still need it.
    this.log.info("Cleanup streams;");

    this.props.onOutputStreamReady(null);
    localMediaService.killStream(this.internalStream);
    this.internalStream = null;
  }

  /*
   * Rendering.
   */

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
          onContextMenu={this.handleContextDown}
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
    this.setState({ videoSizing: DomSizingUtils.recalculateToRatio(width, height, this.ASPECT_RATIO) });
  }

  /*
   * Service events related methods:
   */

  @Bind()
  public onRenderingObjectSelected(object: Optional<AbstractCanvasGraphicsRenderObject>): void {

    const {graphicsState: {propagateRendererEvents}, graphicsActions: {selectObject}} = this.props;

    if (propagateRendererEvents) {
      selectObject(object);
    }
  }

  @Bind()
  private attachServiceHandlers(): void {
    this.internalRenderingService.addEventListener(ERenderingServiceEvent.OBJECT_SELECTED, this.onRenderingObjectSelected);
  }

}
