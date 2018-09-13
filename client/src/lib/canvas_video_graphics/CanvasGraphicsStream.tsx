import * as React from "react";
import {Component} from "react";

import {CanvasGraphicsRenderer} from "./CanvasGraphicsRenderer";
import {CanvasGraphicsRenderObject} from "./graphics_objects/CanvasGraphicsRenderObject";
import {CanvasGraphicsVideoRenderer} from "./graphics_objects/CanvasGraphicsVideoRenderer";

import {CanvasGraphicsAdaptiveLayout} from "./layout/CanvasGraphicsAdaptiveLayout";

export interface ICanvasGraphicsStreamProps {
  animate: boolean;
  stream: MediaStream;
}

export class CanvasGraphicsStream extends Component<ICanvasGraphicsStreamProps> {

  public readonly state = {
    sizing: {
      height: 90,
      width: 160
    }
  };

  public render(): JSX.Element {
    return (
        <CanvasGraphicsAdaptiveLayout onAdaptiveSizeChange={(width, height) => this.handleAdaptiveResize(width, height)}>
          <CanvasGraphicsRenderer animate={this.props.animate} sizing={this.state.sizing}
                                  renderObjects={this.getRenderingObjectsContext()}/>
        </CanvasGraphicsAdaptiveLayout>
    );
  }

  private getRenderingObjectsContext(): Array<CanvasGraphicsRenderObject> {
    return [new CanvasGraphicsVideoRenderer(this.props.stream)];
  }

  private handleAdaptiveResize(width: number, height: number) {
    this.setState({ ...this.state, sizing: { width, height } });
  }

}
