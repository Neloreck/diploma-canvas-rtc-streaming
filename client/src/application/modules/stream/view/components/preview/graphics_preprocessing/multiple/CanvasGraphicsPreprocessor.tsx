import * as React from "react";
import {PureComponent, ReactNode} from "react";

// Lib.
import {AbstractCanvasGraphicsRenderObject, ContextCleanerRO, DomVideoRO, GridLayoutRO} from "@Lib/graphics";
import {Optional} from "@Lib/ts/types";

// View.
import {CanvasGraphicsRenderer, ICanvasGraphicsRendererExternalProps} from "./CanvasGraphicsRenderer";

// Props.
export interface ICanvasGraphicsPreprocessorProps {
  onOutputStreamReady: (stream: Optional<MediaStream>) => void;
  showMainVideo: boolean;
  showGrid: boolean;
  showGraphics: boolean;
  showPreview: boolean;
  renderingObjects: Array<AbstractCanvasGraphicsRenderObject<any>>;
  stream: MediaStream | null;
}

export class CanvasGraphicsPreprocessor extends PureComponent<ICanvasGraphicsPreprocessorProps> {

  private videoConvertor: DomVideoRO = new DomVideoRO(null as any);

  public componentWillReceiveProps(nextProps: ICanvasGraphicsPreprocessorProps): void {
    if (nextProps.stream !== this.props.stream) {
      this.videoConvertor.dispose();
      this.videoConvertor = new DomVideoRO(nextProps.stream);
    }
  }

  public componentWillUnmount(): void {
    this.videoConvertor.dispose();
    this.videoConvertor = new DomVideoRO(null);
  }

  public render(): ReactNode {
    return (
      <CanvasGraphicsRenderer
        previewMode={this.props.showPreview}
        onOutputStreamReady={this.props.onOutputStreamReady}
        externalRenderingItems={this.getOutputRenderingObjectsContext()}
        internalRenderingItems={this.getPreviewRenderingObjectsContext()}
        {...{} as ICanvasGraphicsRendererExternalProps}
      />
    );
  }

  /*
   * Rendering context config:
   */

  /* Everything visible on preview. */
  private getPreviewRenderingObjectsContext(): Array<AbstractCanvasGraphicsRenderObject<any>> {

    const {showGraphics, showGrid, showPreview, renderingObjects} = this.props;
    let previewItems: Array<AbstractCanvasGraphicsRenderObject<any>> = [this.getMainVideoRenderer()];

    // Show grid for preview.
    if (showGraphics === true) {

      if (showPreview === false && showGrid === true) {
        previewItems.push(new GridLayoutRO());
      }

      previewItems = previewItems.concat(renderingObjects);
    }

    return previewItems;
  }

  /* Everything visible on output. */
  private getOutputRenderingObjectsContext(): Array<AbstractCanvasGraphicsRenderObject<any>> {

    const {showGraphics, renderingObjects} = this.props;
    const outputItems: Array<AbstractCanvasGraphicsRenderObject<any>> = [this.getMainVideoRenderer()];

    // Output video and canvas items for external.
    return showGraphics === true ?  outputItems.concat(renderingObjects) : outputItems;
  }

  private getMainVideoRenderer(): AbstractCanvasGraphicsRenderObject<any> {

    const {showMainVideo} = this.props;

    // If 'display' webcam video.
    if (showMainVideo) {
      return this.videoConvertor;
    } else {
      return new ContextCleanerRO();
    }
  }

}
