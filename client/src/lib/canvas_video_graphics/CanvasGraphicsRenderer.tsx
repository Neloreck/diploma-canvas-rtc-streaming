import * as React from "react";
import {createRef, PureComponent, RefObject} from "react";

import {CanvasGraphicsRenderObject} from "./graphics_objects/CanvasGraphicsRenderObject";
import {ICanvasGraphicsSizingContext} from "./graphics_objects/ICanvasGraphicsSizingContext";

export interface ICanvasGraphicsRendererProps {
  animate: boolean;
  renderObjects: Array<CanvasGraphicsRenderObject>;
  sizing: {
    height: number;
    width: number;
  };
}

export class CanvasGraphicsRenderer extends PureComponent<ICanvasGraphicsRendererProps> {

  private shouldRender: boolean = false;
  private canvasRef: RefObject<HTMLCanvasElement> = createRef();

  public componentWillMount(): void {
    this.shouldRender = true;
  }

  public componentDidMount(): void {
    this.renderContext();
  }

  public componentWillUnmount(): void {
    this.shouldRender = false;
  }

  public render(): JSX.Element {
    return (
      <canvas ref={this.canvasRef} height={this.props.sizing.height} width={this.props.sizing.width}/>
    );
  }

  private renderContext(): void {

    this.renderItems();

    if (this.shouldRender) {
      window.requestAnimationFrame(() => this.renderContext());
    }

  }

  private renderItems(): void {

    this.getCanvasContext().clearRect(0, 0, this.props.sizing.width, this.props.sizing.height);

    for (const object of this.props.renderObjects) {
      object.setContext(this.getCanvasContext());
      object.setSizing(this.getCanvasSizing());
      object.renderSelf();
    }

  }

  private getCanvasElement(): HTMLCanvasElement {
    return (this.canvasRef.current as any);
  }

  private getCanvasContext(): CanvasRenderingContext2D {
    return this.getCanvasElement().getContext("2d") as CanvasRenderingContext2D;
  }

  private getCanvasSizing(): ICanvasGraphicsSizingContext {
    const canvas: HTMLCanvasElement = this.getCanvasElement();
    return { width: canvas.width, height: canvas.height };
  }

}
