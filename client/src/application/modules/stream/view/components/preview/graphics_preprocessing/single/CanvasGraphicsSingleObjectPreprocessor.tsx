import * as React from "react";
import {PureComponent} from "react";

// Lib.
import {CanvasGraphicsRenderObject} from "@Lib/graphics";

// View.

export interface ICanvasGraphicsSingleObjectPreprocessorProps {
  object: CanvasGraphicsRenderObject;
  aspectRatio?: number;
}

export class CanvasGraphicsSingleObjectPreprocessor extends PureComponent<ICanvasGraphicsSingleObjectPreprocessorProps> {

  public render(): JSX.Element {
    return <div> todo </div>;
  }

}
