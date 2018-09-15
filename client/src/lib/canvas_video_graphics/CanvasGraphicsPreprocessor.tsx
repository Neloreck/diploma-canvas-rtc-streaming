import * as React from "react";
import {PureComponent} from "react";

import {CanvasGraphicsRenderer} from "./CanvasGraphicsRenderer";

import {CanvasGraphicsRenderObject} from "./graphics_objects/CanvasGraphicsRenderObject";
import {CanvasGraphicsVideoRenderer} from "./graphics_objects/CanvasGraphicsVideoRenderer";

export interface ICanvasGraphicsStreamProps {
  animate: boolean;
  stream: MediaStream;
}

export class CanvasGraphicsPreprocessor extends PureComponent<ICanvasGraphicsStreamProps> {

  public render(): JSX.Element {
    return (
      <CanvasGraphicsRenderer animate={this.props.animate} renderingLayouts={this.getRenderingObjectsContext()}
                              displayAdjustmentGrid={true} renderingGridObjects={[]} />
    );
  }

  private getRenderingObjectsContext(): Array<CanvasGraphicsRenderObject> {
    return [new CanvasGraphicsVideoRenderer(this.props.stream)];
  }

}
