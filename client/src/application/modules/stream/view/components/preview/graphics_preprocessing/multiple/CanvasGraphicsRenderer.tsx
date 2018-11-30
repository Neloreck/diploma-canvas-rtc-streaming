import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {createRef, Fragment, MouseEvent, PureComponent, RefObject} from "react";
import ReactResizeDetector from "react-resize-detector";

// Lib.
import {
  AbstractInteractiveRenderingService,
  CanvasGraphicsMovableObject,
  CanvasGraphicsRenderObject,
  CommonRenderingService,
  DomCanvasShadowRO,
  ERenderingServiceEvent,
  ICanvasGraphicsSizingContext
} from "@Lib/graphics";
import {Optional} from "@Lib/ts/type";
import {DomSizingUtils} from "@Lib/util/DomSizingUtils";

// Data.
import {localMediaService} from "@Module/stream/data/services/local_media";
import {graphicsContextManager, IGraphicsContext} from "@Module/stream/data/store";

// View.
import "../canvasStyling.scss";

// Props.
export interface ICanvasGraphicsRendererOwnProps {
  onOutputStreamReady: (stream: Optional<MediaStream>) => void;
  previewMode: boolean;
  internalRenderingItems: Array<CanvasGraphicsRenderObject>;
  externalRenderingItems: Array<CanvasGraphicsRenderObject>;
}

export interface ICanvasGraphicsRendererExternalProps extends IGraphicsContext {}

export interface ICanvasGraphicsRendererProps extends ICanvasGraphicsRendererOwnProps, ICanvasGraphicsRendererExternalProps {}

@Consume<IGraphicsContext, ICanvasGraphicsRendererProps>(graphicsContextManager)
export class CanvasGraphicsRenderer extends PureComponent<ICanvasGraphicsRendererProps> {

  private readonly ASPECT_RATIO: number = 16 / 9;

  /* Rendering canvases. */
  private readonly internalPreRendererCanvas: RefObject<HTMLCanvasElement> = createRef();
  private readonly externalPreRendererCanvas: RefObject<HTMLCanvasElement> = createRef();
  private readonly composedRendererCanvas: RefObject<HTMLCanvasElement> = createRef();

  /* Rendering services. */
  private readonly internalRenderingService: AbstractInteractiveRenderingService = new CommonRenderingService();
  private readonly externalRenderingService: AbstractInteractiveRenderingService = new CommonRenderingService();
  private readonly composedRenderingService: AbstractInteractiveRenderingService = new CommonRenderingService();

  /* Lifecycle: */

  public componentWillMount(): void {

    this.attachServiceHandlers();

    this.internalRenderingService.enableRendering();
    this.externalRenderingService.enableRendering();
    this.composedRenderingService.enableRendering();
  }

  public componentDidMount(): void {

    const internalPreRendererCanvas: HTMLCanvasElement = this.getInternalPreRenderer();
    const externalPreRendererCanvas: HTMLCanvasElement = this.getExternalPreRenderer();
    const composedRendererCanvas: HTMLCanvasElement = this.getComposedRenderer();

    this.internalRenderingService.setRenderContext(internalPreRendererCanvas.getContext("2d") as CanvasRenderingContext2D);
    this.externalRenderingService.setRenderContext(externalPreRendererCanvas.getContext("2d") as CanvasRenderingContext2D);
    this.composedRenderingService.setRenderContext(composedRendererCanvas.getContext("2d") as CanvasRenderingContext2D);

    this.internalRenderingService.setRenderObjects(this.props.internalRenderingItems);
    this.externalRenderingService.setRenderObjects(this.props.externalRenderingItems);
    this.composedRenderingService.setRenderObjects([
      new DomCanvasShadowRO(externalPreRendererCanvas),
      new DomCanvasShadowRO(internalPreRendererCanvas)
    ]);

    if (this.props.previewMode) {
      this.internalRenderingService.disableInteraction();
    } else {
      this.internalRenderingService.enableInteraction();
    }
    this.externalRenderingService.disableInteraction();

    this.externalRenderingService.disableContextCleanup();

    this.internalRenderingService.render();
    this.externalRenderingService.render();
    this.composedRenderingService.render();

    // Expose stream:
    this.props.onOutputStreamReady(localMediaService.captureStreamFromCanvas(externalPreRendererCanvas));
  }

  public componentWillReceiveProps(nextProps: ICanvasGraphicsRendererProps): void {
    if (nextProps.graphicsState.selectedObject !== this.props.graphicsState.selectedObject) {
      this.internalRenderingService.setSelectedObject(nextProps.graphicsState.selectedObject as Optional<CanvasGraphicsMovableObject>);
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
    this.composedRenderingService.disableRendering();

    this.props.onOutputStreamReady(null);
  }

  public render(): JSX.Element {
    return (
      <Fragment>

        <div
          className={"canvas-renderer-layout"}
          onMouseMove={this.handleLayoutMouseMove}
          onMouseEnter={this.handleLayoutMouseEnter}
          onMouseLeave={this.handleLayoutMouseLeave}
          onMouseDown={this.handleLayoutMouseDown}
          onMouseUp={this.handleLayoutMouseUp}
          onContextMenu={this.handleContextMenu}
        >
          <canvas ref={this.internalPreRendererCanvas} className={"canvas-prerenderer-internal"} hidden/>
          <canvas ref={this.externalPreRendererCanvas} className={"canvas-prerenderer-external"} hidden />
          <canvas ref={this.composedRendererCanvas} className={"canvas-renderer-composed"}/>
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

  /* Getters for pre-renderer: */

  private getInternalPreRenderer(): HTMLCanvasElement {
    return (this.internalPreRendererCanvas.current as any);
  }

  private getExternalPreRenderer(): HTMLCanvasElement {
    return (this.externalPreRendererCanvas.current as any);
  }

  private getComposedRenderer(): HTMLCanvasElement {
    return (this.composedRendererCanvas.current as any);
  }

  /* SERVICE events related methods: */

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
    this.internalRenderingService.handleMouseDown(event);
  }

  @Bind()
  private handleContextMenu(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.internalRenderingService.setSelectedObject(null);
  }

  @Bind()
  private handleLayoutMouseUp(event: MouseEvent): void {
    this.internalRenderingService.handleMouseUp(event);
  }

  @Bind()
  private handleLayoutMouseMove(event: MouseEvent): void {
    this.internalRenderingService.handleMouseMove(event);
  }

  @Bind()
  private handleLayoutMouseEnter(event: MouseEvent): void {
    this.internalRenderingService.handleMouseEnter(event);
  }

  @Bind()
  private handleLayoutMouseLeave(event: MouseEvent): void {
    this.internalRenderingService.handleMouseLeave(event);
  }

  /* Sizing related methods: */

  @Bind()
  private resize(width: number, height: number): void {

    const sizing: { width: number, height: number } = DomSizingUtils.recalculateToRatio(width, height, this.ASPECT_RATIO);

    // Update sizing for layouts.

    const internalPreRenderer: HTMLCanvasElement = this.getInternalPreRenderer();
    const externalPreRenderer: HTMLCanvasElement = this.getExternalPreRenderer();
    const composedRenderer: HTMLCanvasElement = this.getComposedRenderer();

    internalPreRenderer.width = sizing.width;
    internalPreRenderer.height = sizing.height;

    externalPreRenderer.width = sizing.width;
    externalPreRenderer.height = sizing.height;

    composedRenderer.width = sizing.width;
    composedRenderer.height = sizing.height;

    // Update sizing context for renderer.

    const boundingRect: ClientRect = composedRenderer.getBoundingClientRect();
    const sizingContext: ICanvasGraphicsSizingContext = {
      height: sizing.height,
      offsetX: boundingRect.left,
      offsetY: boundingRect.top,
      width: sizing.width
    };

    this.internalRenderingService.setSizing(sizingContext);
    this.externalRenderingService.setSizing(sizingContext);
    this.composedRenderingService.setSizing(sizingContext);
  }

}
