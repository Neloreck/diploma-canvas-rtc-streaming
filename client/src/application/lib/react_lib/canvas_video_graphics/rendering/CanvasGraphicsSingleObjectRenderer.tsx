import * as React from "react";
import {createRef, Fragment, MouseEvent, PureComponent, RefObject} from "react";
import ReactResizeDetector from "react-resize-detector";

import {Bind} from "@redux-cbd/utils";

import {ICanvasGraphicsSizingContext} from "./context/index";
import {CanvasGraphicsRenderObject} from "./graphics_objects/index";
import {AbstractRenderingService, RenderingService} from "./services/index";

import "../canvasStyling.scss";

export interface ICanvasGraphicsSingleObjectRendererProps {
  object: CanvasGraphicsRenderObject;
}

export class CanvasGraphicsSingleObjectRenderer extends PureComponent<ICanvasGraphicsSingleObjectRendererProps> {

  private static readonly DEFAULT_ASPECT_RATIO: number = 1;

  private readonly renderingCanvas: RefObject<HTMLCanvasElement> = createRef();

  private readonly renderingService: AbstractRenderingService = new RenderingService();

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

  public componentDidUpdate(): void {
    this.renderingService.setRenderObjects([this.props.object]);
  }

  public componentWillUnmount(): void {
    this.renderingService.disableRendering();
  }

  public render(): JSX.Element {
    return (
      <Fragment>

        <div className={"canvas-renderer-layout-preview"}
             onMouseMove={this.handleLayoutMouseMove}
             onMouseEnter={this.handleLayoutMouseEnter}
             onMouseLeave={this.handleLayoutMouseLeave}
             onMouseDown={this.handleLayoutMouseDown}
             onMouseUp={this.handleLayoutMouseUp}
        >

          <canvas ref={this.renderingCanvas} className={"canvas-renderer-preview"}/>

        </div>

        <ReactResizeDetector
          onResize={(width, height) => this.reCalculateSizing(width, height)}
          refreshMode={"throttle"} refreshRate={250}
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

  /* Sizing related methods: */

  private reCalculateSizing(width: number, height: number): void {

    let canvasWidth: number = 0;
    let canvasHeight: number = 0;

    const aspectRatio: number = CanvasGraphicsSingleObjectRenderer.DEFAULT_ASPECT_RATIO;
    const maxHeight = width / aspectRatio;

    if (maxHeight <= height) {
      canvasHeight = maxHeight;
      canvasWidth = width;
    } else {
      canvasHeight = height;
      canvasWidth = height * aspectRatio;
    }

    this.resize(Math.round(canvasWidth), Math.round(canvasHeight));
  }

  private resize(width: number, height: number): void {

    // Update sizing for layout.

    const renderingCanvas: HTMLCanvasElement = this.getRenderingCanvas();

    renderingCanvas.width = width;
    renderingCanvas.height = height;

    // Update sizing context for renderer.

    const boundingRect: ClientRect = renderingCanvas.getBoundingClientRect();
    const sizingContext: ICanvasGraphicsSizingContext = {
      height,
      offsetX: boundingRect.left,
      offsetY: boundingRect.top,
      width
    };

    this.renderingService.setSizing(sizingContext);
  }

}
