import * as React from "react";
import {createRef, Fragment, MouseEvent, PureComponent, RefObject} from "react";
import ReactResizeDetector from "react-resize-detector";

import {Bind} from "@redux-cbd/utils";

import {ICanvasGraphicsSizingContext} from "./context/index";
import {CanvasGraphicsRenderObject, DomCanvasShadowRO} from "./graphics_objects/index";
import {AbstractRenderingService, RenderingService} from "./services/index";

import "../canvasStyling.scss";

export interface ICanvasGraphicsRendererProps {
  previewMode: boolean;
  internalRenderingItems: Array<CanvasGraphicsRenderObject>;
  externalRenderingItems: Array<CanvasGraphicsRenderObject>;
}

export class CanvasGraphicsRenderer extends PureComponent<ICanvasGraphicsRendererProps> {

  private static readonly DEFAULT_ASPECT_RATIO: number = 1.77;

  private readonly internalPreRendererCanvas: RefObject<HTMLCanvasElement> = createRef();
  private readonly externalPreRendererCanvas: RefObject<HTMLCanvasElement> = createRef();
  private readonly composedRendererCanvas: RefObject<HTMLCanvasElement> = createRef();

  private readonly internalRenderingService: AbstractRenderingService = new RenderingService();
  private readonly externalRenderingService: AbstractRenderingService = new RenderingService();
  private readonly composedRenderingService: AbstractRenderingService = new RenderingService();

  /* Lifecycle: */

  public componentWillMount(): void {

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
  }

  /* Stream getters for referal: */

  public getInternalStream(): MediaStream {
    // @ts-ignore
    return this.getInternalPreRenderer().captureStream();
  }

  public getExternalStream(): MediaStream {
    // @ts-ignore
    return this.getExternalPreRenderer().captureStream();
  }

  public getComposedStream(): MediaStream {
    // @ts-ignore
    return this.getComposedRenderer().captureStream();
  }

  public render(): JSX.Element {
    return (
      <Fragment>

        <div className={"canvas-renderer-layout"}
             onMouseMove={this.handleLayoutMouseMove}
             onMouseEnter={this.handleLayoutMouseEnter}
             onMouseLeave={this.handleLayoutMouseLeave}
             onMouseDown={this.handleLayoutMouseDown}
             onMouseUp={this.handleLayoutMouseUp}
        >

          <canvas ref={this.internalPreRendererCanvas} className={"canvas-prerenderer-internal"} hidden/>
          <canvas ref={this.externalPreRendererCanvas} className={"canvas-prerenderer-external"} hidden />
          <canvas ref={this.composedRendererCanvas} className={"canvas-renderer-composed"}/>

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

  private getInternalPreRenderer(): HTMLCanvasElement {
    return (this.internalPreRendererCanvas.current as any);
  }

  private getExternalPreRenderer(): HTMLCanvasElement {
    return (this.externalPreRendererCanvas.current as any);
  }

  private getComposedRenderer(): HTMLCanvasElement {
    return (this.composedRendererCanvas.current as any);
  }

  /* Events related methods: */

  @Bind()
  private handleLayoutMouseDown(event: MouseEvent): void {
    this.internalRenderingService.handleMouseDown(event);
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

  private reCalculateSizing(width: number, height: number): void {

    let canvasWidth: number = 0;
    let canvasHeight: number = 0;

    const aspectRatio: number = CanvasGraphicsRenderer.DEFAULT_ASPECT_RATIO;
    const maxHeight = width / aspectRatio;

    if (maxHeight <= height) {
      canvasHeight = maxHeight;
      canvasWidth = width;
    } else {
      canvasHeight = height;
      canvasWidth = height * aspectRatio;
    }

    this.resize(Math.round(canvasWidth) - 25 * 1.1, Math.round(canvasHeight) - 25);
  }

  private resize(width: number, height: number): void {

    // Update sizing for layouts.

    const internalPreRenderer: HTMLCanvasElement = this.getInternalPreRenderer();
    const externalPreRenderer: HTMLCanvasElement = this.getExternalPreRenderer();
    const composedRenderer: HTMLCanvasElement = this.getComposedRenderer();

    internalPreRenderer.width = width;
    internalPreRenderer.height = height;

    externalPreRenderer.width = width;
    externalPreRenderer.height = height;

    composedRenderer.width = width;
    composedRenderer.height = height;

    // Update sizing context for renderer.

    const boundingRect: ClientRect = composedRenderer.getBoundingClientRect();
    const sizingContext: ICanvasGraphicsSizingContext = {
      height,
      offsetX: boundingRect.left,
      offsetY: boundingRect.top,
      width
    };

    this.internalRenderingService.setSizing(sizingContext);
    this.externalRenderingService.setSizing(sizingContext);
    this.composedRenderingService.setSizing(sizingContext);
  }

}