import * as React from "react";
import {PureComponent} from "react";

import {CanvasGraphicsRenderer} from "./CanvasGraphicsRenderer";

import {CanvasGraphicsRenderObject, DomVideoRO} from "./rendering/graphics_objects/index";
import {GridLayoutRO} from "./rendering/graphics_objects/index";

import {CenteredTextRO} from "./rendering/graphics_objects/static/text/CenteredTextRO";

export interface ICanvasGraphicsStreamProps {
  showGrid: boolean;
  showGraphics: boolean;
  showPreview: boolean;
  renderingObjects: Array<CanvasGraphicsRenderObject>;
  stream: MediaStream | null;
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

    if (this.props.showGraphics === false) {
      return previewItems;
    }

    if (this.props.showGrid === true && this.props.showPreview === false) {
      previewItems.push(new GridLayoutRO(1, 1));
    }

    return previewItems.concat(this.props.renderingObjects);
  }

  private getOutputRenderingObjectsContext(): Array<CanvasGraphicsRenderObject> {

    // Todo: Spinner instead of this.

    if (this.props.stream === null) {
      return [
        new CenteredTextRO("Waiting for input stream.", 7, "#FFF")
      ];
    }

    if (this.props.stream.getVideoTracks().length === 0) {
      return [
        new CenteredTextRO("Waiting for video.", 7, "#FFF")
      ];
    }

    // Passed 'error' conditions.

    const outputItems: Array<CanvasGraphicsRenderObject> = [
      new DomVideoRO(this.props.stream)
    ];

    if (this.props.showGraphics === true) {
      return outputItems.concat(this.props.renderingObjects);
    }

    return outputItems;
  }

}
