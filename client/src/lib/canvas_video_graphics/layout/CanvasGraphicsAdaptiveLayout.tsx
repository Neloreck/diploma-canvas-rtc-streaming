import * as React from "react";
import {PureComponent} from "react";

import ReactResizeDetector from "react-resize-detector";

export interface ICanvasGraphicsAdaptiveLayoutProps {
  children: any;
  onAdaptiveSizeChange: (width: number, height: number) => void;
}

export class CanvasGraphicsAdaptiveLayout extends PureComponent<ICanvasGraphicsAdaptiveLayoutProps> {

  private static readonly DEFAULT_ASPECT_RATIO: number = 16 / 9;

  public calculateSizing(width: number, height: number) {

    let canvasWidth: number;
    let canvasHeight: number;

    const aspectRatio = CanvasGraphicsAdaptiveLayout.DEFAULT_ASPECT_RATIO;

    const maxHeight = width / aspectRatio;

    if (maxHeight <= height) {
      canvasHeight = maxHeight;
      canvasWidth = maxHeight * aspectRatio;
    } else {
      canvasHeight = height;
      canvasWidth = height * aspectRatio;
    }

    this.props.onAdaptiveSizeChange(canvasWidth, canvasHeight);
  }

  public render(): JSX.Element {
    return (
      <ReactResizeDetector onResize={(width, height) => this.calculateSizing(width, height)}
                           handleHeight handleWidth>
        {this.props.children}
      </ReactResizeDetector>
    );
  }

}
