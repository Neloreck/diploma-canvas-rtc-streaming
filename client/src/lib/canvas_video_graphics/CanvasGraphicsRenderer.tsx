import * as React from "react";
import {createRef, Fragment, PureComponent, RefObject} from "react";

import ReactResizeDetector from "react-resize-detector";

import {CanvasGraphicsRenderObject} from "./graphics_objects/CanvasGraphicsRenderObject";
import {CanvasRenderingService} from "./services/CanvasRenderingService";

export interface ICanvasGraphicsRendererProps {
  animate: boolean;
  renderObjects: Array<CanvasGraphicsRenderObject>;
}

export class CanvasGraphicsRenderer extends PureComponent<ICanvasGraphicsRendererProps> {

  private readonly canvasRef: RefObject<HTMLCanvasElement> = createRef();
  private readonly renderingService: CanvasRenderingService = new CanvasRenderingService();

  public getCanvasElement(): HTMLCanvasElement {
    return (this.canvasRef.current as any);
  }

  public componentWillMount(): void {
    this.renderingService.shouldRender = true;
  }

  public componentDidMount(): void {
    this.renderingService.context = this.getCanvasElement().getContext("2d") as CanvasRenderingContext2D;
    this.renderingService.render();
  }

  public componentWillUnmount(): void {
    this.renderingService.shouldRender = false;
  }

  public componentDidUpdate(): void {
    this.renderingService.renderObjects = this.props.renderObjects;
  }

  public render(): JSX.Element {
    return (
      <Fragment>

        <canvas ref={this.canvasRef}/>

          <ReactResizeDetector onResize={(width, height) => this.reCalculateSizing(width, height)}
                               refreshMode={"throttle"} refreshRate={150}
                               handleHeight handleWidth/>
      </Fragment>
    );
  }

  private reCalculateSizing(width: number, height: number) {

    const canvas: HTMLCanvasElement = this.getCanvasElement();

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

    canvas.height = Math.floor(canvasHeight);
    canvas.width = Math.floor(canvasWidth);

    this.renderingService.sizing.height = canvas.height;
    this.renderingService.sizing.width = canvasWidth;
  }

}
