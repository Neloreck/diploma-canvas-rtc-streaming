import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {createRef, Fragment, MouseEvent, PureComponent, RefObject} from "react";
import ReactResizeDetector from "react-resize-detector";

// Lib.
import {AbstractRenderingService, CanvasGraphicsRenderObject, CommonRenderingService, ICanvasGraphicsSizingContext} from "@Lib/graphics";
import {DomSizingUtils} from "@Lib/util/DomSizingUtils";

// View.
import "../canvasStyling.scss";

// Props.
export interface ICanvasGraphicsSingleObjectRendererProps {
  object: CanvasGraphicsRenderObject;
  aspectRatio?: number;
}

export class CanvasGraphicsSingleObjectRenderer extends PureComponent<ICanvasGraphicsSingleObjectRendererProps> {

  private static readonly DEFAULT_ASPECT_RATIO: number = 1;

  private readonly renderingCanvas: RefObject<HTMLCanvasElement> = createRef();

  private readonly renderingService: AbstractRenderingService = new CommonRenderingService();

  /* Lifecycle: */

  public componentWillMount(): void {
    this.renderingService.enableRendering();
  }

  public componentDidMount(): void {

    const renderingCanvas: HTMLCanvasElement = this.getRenderingCanvas();

    this.renderingService.setRenderContext(renderingCanvas.getContext("2d") as CanvasRenderingContext2D);
    this.renderingService.setRenderObjects([this.props.object]);
    this.renderingService.disableInteraction();

    this.renderingService.render();
  }

  public componentWillUnmount(): void {
    this.renderingService.disableRendering();
  }

  public componentDidUpdate(): void {
    this.renderingService.setRenderObjects([this.props.object]);
  }

  public render(): JSX.Element {
    return (
      <Fragment>

        <div
          className={"canvas-renderer-layout-preview"}
          onMouseMove={this.handleLayoutMouseMove}
          onMouseEnter={this.handleLayoutMouseEnter}
          onMouseLeave={this.handleLayoutMouseLeave}
          onMouseDown={this.handleLayoutMouseDown}
          onMouseUp={this.handleLayoutMouseUp}
        >
          <canvas
            className={"canvas-renderer-preview"}
            ref={this.renderingCanvas}
          />
        </div>

        <ReactResizeDetector
          onResize={this.resize}
          refreshMode={"throttle"}
          refreshRate={250}
          handleHeight handleWidth
        />

      </Fragment>
    );
  }

  /* Getters for pre-renderer: */

  private getRenderingCanvas(): HTMLCanvasElement {
    return (this.renderingCanvas.current as any);
  }

  /* Events related methods: */

  @Bind()
  private handleLayoutMouseDown(event: MouseEvent): void {
    this.renderingService.handleMouseDown(event);
  }

  @Bind()
  private handleLayoutMouseUp(event: MouseEvent): void {
    this.renderingService.handleMouseUp(event);
  }

  @Bind()
  private handleLayoutMouseMove(event: MouseEvent): void {
    this.renderingService.handleMouseMove(event);
  }

  @Bind()
  private handleLayoutMouseEnter(event: MouseEvent): void {
    this.renderingService.handleMouseEnter(event);
  }

  @Bind()
  private handleLayoutMouseLeave(event: MouseEvent): void {
    this.renderingService.handleMouseLeave(event);
  }

  @Bind()
  private resize(width: number, height: number): void {

    const sizing: { width: number, height: number } = DomSizingUtils.recalculateToRatio(width, height, this.props.aspectRatio || CanvasGraphicsSingleObjectRenderer.DEFAULT_ASPECT_RATIO);

    // Update sizing for layout.

    const renderingCanvas: HTMLCanvasElement = this.getRenderingCanvas();
    const boundingRect: ClientRect = renderingCanvas.getBoundingClientRect();

    renderingCanvas.width = sizing.width;
    renderingCanvas.height = sizing.height;

    // Update sizing context for renderer.

    const sizingContext: ICanvasGraphicsSizingContext = {
      height: sizing.height,
      offsetX: boundingRect.left,
      offsetY: boundingRect.top,
      width: sizing.width
    };

    this.renderingService.setSizing(sizingContext);
  }

}
