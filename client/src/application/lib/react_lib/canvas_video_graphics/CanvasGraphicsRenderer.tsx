import * as React from "react";
import {createRef, Fragment, MouseEvent, PureComponent, RefObject} from "react";
import ReactResizeDetector from "react-resize-detector";
import {AutoBind} from "redux-cbd";

import {ICanvasGraphicsSizingContext} from "./rendering/context/index";
import {CanvasGraphicsRenderObject, DomCanvasShadowRO} from "./rendering/graphics_objects";
import {AbstractRenderingService, RenderingService} from "./rendering/services";

export interface ICanvasGraphicsRendererProps {
  internalRenderingItems: Array<CanvasGraphicsRenderObject>;
  externalRenderingItems: Array<CanvasGraphicsRenderObject>;
}

export class CanvasGraphicsRenderer extends PureComponent<ICanvasGraphicsRendererProps> {

  private static readonly DEFAULT_ASPECT_RATIO: number = 16 / 9;

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

    this.internalRenderingService.enableInteraction();

    this.internalRenderingService.render();
    this.externalRenderingService.render();
    this.composedRenderingService.render();
  }

  public componentDidUpdate(): void {

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

    // @ts-ignore
    window.t = this;

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

        <ReactResizeDetector onResize={(width, height) => this.reCalculateSizing(width, height)}
                             refreshMode={"throttle"} refreshRate={500}
                             handleHeight handleWidth/>

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

  @AutoBind
  private handleLayoutMouseDown(event: MouseEvent): void {
    this.internalRenderingService.handleMouseDown(event);
  }

  @AutoBind
  private handleLayoutMouseUp(event: MouseEvent): void {
    this.internalRenderingService.handleMouseUp(event);
  }

  @AutoBind
  private handleLayoutMouseMove(event: MouseEvent): void {
    this.internalRenderingService.handleMouseMove(event);
  }

  @AutoBind
  private handleLayoutMouseEnter(event: MouseEvent): void {
    this.internalRenderingService.handleMouseEnter(event);
  }

  @AutoBind
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

    this.resize(Math.floor(canvasWidth), Math.floor(canvasHeight));
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
