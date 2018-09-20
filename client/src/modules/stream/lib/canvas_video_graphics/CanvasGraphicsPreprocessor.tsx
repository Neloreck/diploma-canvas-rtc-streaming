import * as React from "react";
import {PureComponent} from "react";

import {CanvasGraphicsRenderer} from "./CanvasGraphicsRenderer";

import {CanvasGraphicsRenderObject, DomVideoRO} from "./rendering/graphics_objects/index";
import {GridLayoutRO} from "./rendering/graphics_objects/index";

import {MovableRingMRO} from "./rendering/graphics_objects/movable/util/MovableRingMRO";
import {MovableRectangleMRO} from "./rendering/graphics_objects/movable/util/MovableRectangleMRO";

export interface ICanvasGraphicsStreamProps {
  enableGridConfiguration: boolean;
  gridConfigObjects: Array<any>;
  stream: MediaStream;
}

export class CanvasGraphicsPreprocessor extends PureComponent<ICanvasGraphicsStreamProps> {

  public render(): JSX.Element {

    return (
      <CanvasGraphicsRenderer externalRenderingItems={this.getExternalRenderingObjectsContext()}
                              internalRenderingItems={this.getInternalRenderingObjectsContext()} />
    );

  }

  private getInternalRenderingObjectsContext(): Array<CanvasGraphicsRenderObject> {
    return this.props.enableGridConfiguration
      ? [
        new MovableRingMRO(5, { x: 50, y: 50 }),
        new MovableRingMRO(8, { x: 25, y: 50 }),
        new MovableRingMRO(4, { x: 88, y: 13 }),
        new MovableRectangleMRO(10, 25, 25, 15),
        new MovableRectangleMRO(50, 65, 33, 25),
         new GridLayoutRO(1, 1)
      ]
      : [];
  }

  private getExternalRenderingObjectsContext(): Array<CanvasGraphicsRenderObject> {
    return [new DomVideoRO(this.props.stream)];
  }

}
