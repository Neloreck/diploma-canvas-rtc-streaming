import * as React from "react";
import {PureComponent} from "react";

import {CanvasGraphicsRenderer} from "./CanvasGraphicsRenderer";

import {CanvasGraphicsRenderObject, DomVideoRO} from "./rendering/graphics_objects/index";
import {GridLayoutRO} from "./rendering/graphics_objects/index";

import {CenteredTextRO} from "./rendering/graphics_objects/static/text/CenteredTextRO";

export interface ICanvasGraphicsStreamProps {
  enableGridConfiguration: boolean;
  gridConfigObjects: Array<any>;
  stream: MediaStream;
}

export class CanvasGraphicsPreprocessor extends PureComponent<ICanvasGraphicsStreamProps> {

  public render(): JSX.Element {
    // @ts-ignore
    window.t2 = this;
    return (
      <CanvasGraphicsRenderer externalRenderingItems={this.getExternalRenderingObjectsContext()}
                              internalRenderingItems={this.getInternalRenderingObjectsContext()} />
    );
  }

  private getInternalRenderingObjectsContext(): Array<CanvasGraphicsRenderObject> {

    if (this.props.enableGridConfiguration === false) {
      return [];
    }

    return [
      new GridLayoutRO(1, 1),
      ...this.props.gridConfigObjects
    ];
  }

  private getExternalRenderingObjectsContext(): Array<CanvasGraphicsRenderObject> {

    if (this.props.stream === null) {
      return [
        new CenteredTextRO("No input stream provided.", 7, "#FFF")
      ];
    }

    if (this.props.stream.getVideoTracks().length === 0) {
      return [
        new CenteredTextRO("Waiting for video.", 7, "#FFF")
      ];
    }

    return [
      new DomVideoRO(this.props.stream),
      ...this.props.gridConfigObjects
    ];
  }

}
