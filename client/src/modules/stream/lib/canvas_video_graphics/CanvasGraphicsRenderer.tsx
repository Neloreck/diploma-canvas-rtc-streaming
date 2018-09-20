import * as React from "react";
import {createRef, Fragment, PureComponent, RefObject} from "react";
import ReactResizeDetector from "react-resize-detector";

import {ICanvasGraphicsSizingContext} from "./rendering/context/index";
import {CanvasGraphicsRenderObject, DomCanvasShadowRO} from "./rendering/graphics_objects/index";
import {RenderingService} from "./rendering/services/index";

export interface ICanvasGraphicsRendererProps {
  internalRenderingItems: Array<CanvasGraphicsRenderObject>;
  externalRenderingItems: Array<CanvasGraphicsRenderObject>;
}

export class CanvasGraphicsRenderer extends PureComponent<ICanvasGraphicsRendererProps> {

  private static readonly DEFAULT_ASPECT_RATIO: number = 16 / 9;

  private readonly internalPreRendererCanvas: RefObject<HTMLCanvasElement> = createRef();
  private readonly externalPreRendererCanvas: RefObject<HTMLCanvasElement> = createRef();
  private readonly composedRendererCanvas: RefObject<HTMLCanvasElement> = createRef();

  private readonly internalRenderingService: RenderingService = new RenderingService();
  private readonly externalRenderingService: RenderingService = new RenderingService();
  private readonly composedRenderingService: RenderingService = new RenderingService();

  public componentWillMount(): void {

    this.internalRenderingService.shouldRender = true;
    this.externalRenderingService.shouldRender = true;
    this.composedRenderingService.shouldRender = true;

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

    this.internalRenderingService.shouldHandleInteraction = true;

    this.internalRenderingService.render();
    this.externalRenderingService.render();
    this.composedRenderingService.render();

  }

  public componentDidUpdate(): void {

    this.internalRenderingService.setRenderObjects(this.props.internalRenderingItems);
    this.externalRenderingService.setRenderObjects(this.props.externalRenderingItems);

  }

  public componentWillUnmount(): void {

    this.internalRenderingService.shouldRender = false;
    this.externalRenderingService.shouldRender = false;
    this.composedRenderingService.shouldRender = false;

  }

  public render(): JSX.Element {

    return (
      <Fragment>

        <div className={"canvas-renderer-layout"}
             onMouseMove={(e) => this.handleLayoutMouseMove(e as any)}
             onMouseEnter={(e) => this.handleLayoutMouseEnter(e as any)}
             onMouseLeave={(e) => this.handleLayoutMouseLeave(e as any)}
             onMouseDown={(e) => this.handleLayoutMouseDown(e as any)}
             onMouseUp={(e) => this.handleLayoutMouseUp(e as any)}
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

  /* Getters */

  private getInternalPreRenderer(): HTMLCanvasElement {
    return (this.internalPreRendererCanvas.current as any);
  }

  private getExternalPreRenderer(): HTMLCanvasElement {
    return (this.externalPreRendererCanvas.current as any);
  }

  private getComposedRenderer(): HTMLCanvasElement {
    return (this.composedRendererCanvas.current as any);
  }

  /* Events related */

  private handleLayoutMouseDown(event: MouseEvent): void {

    this.internalRenderingService.handleMouseDown(event);
    this.externalRenderingService.handleMouseDown(event);
    this.composedRenderingService.handleMouseDown(event);

  }

  private handleLayoutMouseUp(event: MouseEvent): void {

    this.internalRenderingService.handleMouseUp(event);
    this.externalRenderingService.handleMouseUp(event);
    this.composedRenderingService.handleMouseUp(event);

  }

  private handleLayoutMouseMove(event: MouseEvent): void {

    this.internalRenderingService.handleMouseMove(event);
    this.externalRenderingService.handleMouseMove(event);
    this.composedRenderingService.handleMouseMove(event);

  }

  private handleLayoutMouseEnter(event: MouseEvent): void {

    this.internalRenderingService.handleMouseEnter(event);
    this.externalRenderingService.handleMouseEnter(event);
    this.composedRenderingService.handleMouseEnter(event);

  }

  private handleLayoutMouseLeave(event: MouseEvent): void {

    this.internalRenderingService.handleMouseLeave(event);
    this.externalRenderingService.handleMouseLeave(event);
    this.composedRenderingService.handleMouseLeave(event);

  }

  /* Sizing related */

  private reCalculateSizing(width: number, height: number): void {

    let canvasWidth: number;
    let canvasHeight: number;

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

    // Update sizing.

    const internalPreRenderer: HTMLCanvasElement = this.getInternalPreRenderer();
    const externalPreRenderer: HTMLCanvasElement = this.getExternalPreRenderer();
    const composedRenderer: HTMLCanvasElement = this.getComposedRenderer();

    internalPreRenderer.width = width;
    internalPreRenderer.height = height;

    externalPreRenderer.width = width;
    externalPreRenderer.height = height;

    composedRenderer.width = width;
    composedRenderer.height = height;

    // Update sizing context.

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
