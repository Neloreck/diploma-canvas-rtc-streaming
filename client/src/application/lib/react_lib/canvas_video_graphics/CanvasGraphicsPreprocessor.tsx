import * as React from "react";
import {PureComponent} from "react";

import {CanvasGraphicsRenderer} from "./rendering/CanvasGraphicsRenderer";
import {CanvasGraphicsRenderObject, DomVideoRO} from "./rendering/graphics_objects";
import {GridLayoutRO} from "./rendering/graphics_objects";
import {ContextCleanerRO} from "./rendering/graphics_objects/static/dom/ContextCleanerRO";
import {CenteredTextRO} from "./rendering/graphics_objects/static/text/CenteredTextRO";

export interface ICanvasGraphicsStreamProps {
  showMainVideo: boolean;
  showGrid: boolean;
  showGraphics: boolean;
  showPreview: boolean;
  renderingObjects: Array<CanvasGraphicsRenderObject>;
  stream: MediaStream | null;
}

export class CanvasGraphicsPreprocessor extends PureComponent<ICanvasGraphicsStreamProps> {

  public render(): JSX.Element {
    return (
      <CanvasGraphicsRenderer
        previewMode={this.props.showPreview}
        externalRenderingItems={this.getOutputRenderingObjectsContext()}
        internalRenderingItems={this.getPreviewRenderingObjectsContext()}
      />
    );
  }

  private getPreviewRenderingObjectsContext(): Array<CanvasGraphicsRenderObject> {

    const {showGraphics, showGrid, showPreview, renderingObjects} = this.props;
    const previewItems: Array<CanvasGraphicsRenderObject> = [];

    if (showGraphics === false) {
      return previewItems;
    }

    if (showGrid === true && showPreview === false) {
      previewItems.push(new GridLayoutRO(1, 1));
    }

    return previewItems.concat(renderingObjects);
  }

  private getOutputRenderingObjectsContext(): Array<CanvasGraphicsRenderObject> {

    const {stream, showMainVideo, showGraphics, renderingObjects} = this.props;
    const outputItems: Array<CanvasGraphicsRenderObject> = [];

    if (showMainVideo) {
      if (stream === null) {
        return [
          new CenteredTextRO("Waiting for input stream.", 7, "#FFF")
        ];
      }

      if (stream.getVideoTracks().length === 0) {
        return [
          new CenteredTextRO("Waiting for video.", 7, "#FFF")
        ];
      }

      outputItems.push(new DomVideoRO(stream));
    } else {
      outputItems.push(new ContextCleanerRO());
    }

    if (showGraphics === true) {
      return outputItems.concat(renderingObjects);
    }

    return outputItems;
  }

}
