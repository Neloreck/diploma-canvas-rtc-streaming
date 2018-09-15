import * as React from "react";
import {createRef, Fragment, PureComponent, RefObject} from "react";

import ReactResizeDetector from "react-resize-detector";

import {CanvasGraphicsRenderObject} from "./graphics_objects/CanvasGraphicsRenderObject";
import {CanvasGraphicsShadowRenderer} from "./graphics_objects/CanvasGraphicsShadowRenderer";

import {CanvasGridRenderingService} from "./items/graphics_layout/services/CanvasGridRenderingService";
import {CanvasGraphicsRenderingService} from "./items/graphics_render/services/CanvasGraphicsRenderingService";

import {ICanvasGraphicsSizingContext} from "./context/ICanvasGraphicsSizingContext";

export interface ICanvasGraphicsRendererProps {
  animate: boolean;
  displayAdjustmentGrid: boolean;
  renderingLayouts: Array<CanvasGraphicsRenderObject>;
  renderingGridObjects: Array<CanvasGraphicsRenderObject>;
}

export class CanvasGraphicsRenderer extends PureComponent<ICanvasGraphicsRendererProps> {

  private readonly graphicsRenderingService: CanvasGraphicsRenderingService = new CanvasGraphicsRenderingService();
  private readonly gridRenderingService: CanvasGridRenderingService = new CanvasGridRenderingService();

  private readonly previewCanvas: RefObject<HTMLCanvasElement> = createRef();
  private readonly gridCanvas: RefObject<HTMLCanvasElement> = createRef();

  public getPreviewCanvasElement(): HTMLCanvasElement {
    return (this.previewCanvas.current as any);
  }

  public getGridCanvasElement(): HTMLCanvasElement {
    return (this.gridCanvas.current as any);
  }

  public componentWillMount(): void {
    this.graphicsRenderingService.shouldRender = true;
  }

  public componentDidMount(): void {

    // Grid related.

    this.gridRenderingService.context = this.getGridCanvasElement().getContext("2d") as CanvasRenderingContext2D;
    this.gridRenderingService.shouldRender = this.props.displayAdjustmentGrid;
    this.gridRenderingService.reRender();

    // Preview related.

    this.graphicsRenderingService.context = this.getPreviewCanvasElement().getContext("2d") as CanvasRenderingContext2D;
    this.graphicsRenderingService.renderObjects = [...this.props.renderingLayouts];

    if (this.props.displayAdjustmentGrid) {
      this.graphicsRenderingService.renderObjects.unshift(new CanvasGraphicsShadowRenderer(this.getGridCanvasElement()));
    }

    this.graphicsRenderingService.render();
  }

  public componentDidUpdate(): void {

    this.gridRenderingService.shouldRender = this.props.displayAdjustmentGrid;
    this.gridRenderingService.reRender();

    this.graphicsRenderingService.renderObjects = [ ...this.props.renderingLayouts ];

    if (this.props.displayAdjustmentGrid) {
      this.graphicsRenderingService.renderObjects.unshift(new CanvasGraphicsShadowRenderer(this.getGridCanvasElement()));
    }
  }

  public componentWillUnmount(): void {
    this.graphicsRenderingService.shouldRender = false;
  }

  public render(): JSX.Element {
    return (
      <Fragment>

        <div className={"canvas-renderer-layout"}
             onMouseMove={(e) => this.gridRenderingService.onGridMouseMove(e)}
             onMouseLeave={(e) => this.gridRenderingService.onGridMouseLeave(e)}
             onClick={(e) => this.gridRenderingService.onGridClick(e as any)}>

          <canvas ref={this.previewCanvas}/>
          <canvas ref={this.gridCanvas} hidden/>
        </div>

        <ReactResizeDetector onResize={(width, height) => this.reCalculateSizing(width, height)}
                             refreshMode={"throttle"} refreshRate={500}
                             handleHeight handleWidth/>
      </Fragment>
    );
  }

  private reCalculateSizing(width: number, height: number): void {

    let canvasWidth: number;
    let canvasHeight: number;

    const aspectRatio = 16 / 9;

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

    const sizingContext: ICanvasGraphicsSizingContext = { width, height };

    const previewCanvas: HTMLCanvasElement = this.getPreviewCanvasElement();
    const gridCanvas: HTMLCanvasElement = this.getGridCanvasElement();

    previewCanvas.width = width;
    previewCanvas.height = height;

    gridCanvas.width = width;
    gridCanvas.height = height;

    const boundingRect: ClientRect = previewCanvas.getBoundingClientRect();

    this.graphicsRenderingService.sizing = sizingContext;
    this.gridRenderingService.sizing = sizingContext;
    this.gridRenderingService.offset = { offsetX: boundingRect.left, offsetY: boundingRect.top };

    this.gridRenderingService.reRender();

  }

}
