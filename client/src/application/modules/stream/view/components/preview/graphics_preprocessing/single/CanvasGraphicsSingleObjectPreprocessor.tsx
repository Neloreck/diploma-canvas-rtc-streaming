import * as React from "react";
import {PureComponent} from "react";

// Lib.
import {CanvasGraphicsRenderObject} from "@Lib/graphics";

// View.
import {CanvasGraphicsSingleObjectRenderer} from "./CanvasGraphicsSingleObjectRenderer";

export interface ICanvasGraphicsSingleObjectPreprocessorProps {
  object: CanvasGraphicsRenderObject;
  aspectRatio?: number;
}

export class CanvasGraphicsSingleObjectPreprocessor extends PureComponent<ICanvasGraphicsSingleObjectPreprocessorProps> {

  public render(): JSX.Element {
    return <CanvasGraphicsSingleObjectRenderer object={this.props.object} aspectRatio={this.props.aspectRatio}/>;
  }

}
