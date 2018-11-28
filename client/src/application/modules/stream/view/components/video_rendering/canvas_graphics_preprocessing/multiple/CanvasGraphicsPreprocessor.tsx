import * as React from "react";
import {PureComponent} from "react";

// Lib.
import {CanvasGraphicsRenderObject, CenteredTextRO, ContextCleanerRO, DomVideoRO, GridLayoutRO} from "@Lib/graphics";

// View.
import {CanvasGraphicsRenderer, ICanvasGraphicsRendererExternalProps} from "./CanvasGraphicsRenderer";

// Props.
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
        {...{} as ICanvasGraphicsRendererExternalProps}
      />
    );
  }

  /*
   * Rendering context configuration:
   */

  /* Everything visible on preview. */
  private getPreviewRenderingObjectsContext(): Array<CanvasGraphicsRenderObject> {

    const {showGraphics, showGrid, showPreview, renderingObjects} = this.props;
    const previewItems: Array<CanvasGraphicsRenderObject> = [];

    // Nothing to show there.
    if (showGraphics === false) {
      return [];
    }

    // Show grid for preview.
    if (showGrid === true && showPreview === false) {
      previewItems.push(new GridLayoutRO(1, 1));
    }

    // Grid and other rendering objects.
    return previewItems.concat(renderingObjects);
  }

  /* Everything visible on output. */
  private getOutputRenderingObjectsContext(): Array<CanvasGraphicsRenderObject> {

    const {stream, showMainVideo, showGraphics, renderingObjects} = this.props;
    const outputItems: Array<CanvasGraphicsRenderObject> = [];

    // If 'display' webcam video.
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

    // Concat graphics for output service.
    if (showGraphics === true) {
      return outputItems.concat(renderingObjects);
    }

    return outputItems;
  }

}
