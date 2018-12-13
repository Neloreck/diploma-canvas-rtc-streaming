import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {createRef, Fragment, MouseEvent, PureComponent, ReactNode, RefObject} from "react";
import ReactResizeDetector from "react-resize-detector";

// Lib.
import {AbstractCanvasGraphicsRenderObject, AbstractRenderingService, CommonRenderingService, ICanvasGraphicsSizingContext} from "@Lib/graphics";
import {DomSizingUtils} from "@Lib/utils/DomSizingUtils";

// View.
import "../canvasStyling.scss";

// Props.
export interface ICanvasGraphicsSingleObjectRendererProps {
  object: AbstractCanvasGraphicsRenderObject;
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

  public render(): ReactNode {
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
  }

  @Bind()
  private handleLayoutMouseUp(event: MouseEvent): void {
  }

  @Bind()
  private handleLayoutMouseMove(event: MouseEvent): void {
  }

  @Bind()
  private handleLayoutMouseEnter(event: MouseEvent): void {
  }

  @Bind()
  private handleLayoutMouseLeave(event: MouseEvent): void {
  }

  @Bind()
  private resize(width: number, height: number): void {

    const sizing: { width: number, height: number } = DomSizingUtils.recalculateToRatio(width, height, this.props.aspectRatio || CanvasGraphicsSingleObjectRenderer.DEFAULT_ASPECT_RATIO);

  }

}
