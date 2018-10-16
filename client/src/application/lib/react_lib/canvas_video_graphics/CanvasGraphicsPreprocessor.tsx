import * as React from "react";
import {PureComponent} from "react";

import {CanvasGraphicsRenderer} from "./CanvasGraphicsRenderer";

import {CanvasGraphicsRenderObject, DomVideoRO} from "./rendering/graphics_objects/index";
import {GridLayoutRO} from "./rendering/graphics_objects/index";

import {CenteredTextRO} from "./rendering/graphics_objects/static/text/CenteredTextRO";

export interface ICanvasGraphicsStreamProps {
  showGrid: boolean;
  showPreview: boolean;
  renderingObjects: Array<CanvasGraphicsRenderObject>;
  stream: MediaStream;
}

export class CanvasGraphicsPreprocessor extends PureComponent<ICanvasGraphicsStreamProps> {

  public render(): JSX.Element {
    return (
      <CanvasGraphicsRenderer previewMode={this.props.showPreview}
                              externalRenderingItems={this.getOutputRenderingObjectsContext()}
                              internalRenderingItems={this.getPreviewRenderingObjectsContext()}
      />
    );
  }

  private getPreviewRenderingObjectsContext(): Array<CanvasGraphicsRenderObject> {

    const previewItems: Array<CanvasGraphicsRenderObject> = [];

    if (this.props.showGrid === true && this.props.showPreview === false) {
      previewItems.push(new GridLayoutRO(1, 1));
    }

    return previewItems.concat(this.props.renderingObjects);
  }

  private getOutputRenderingObjectsContext(): Array<CanvasGraphicsRenderObject> {

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
      ...this.props.renderingObjects
    ];
  }

}
