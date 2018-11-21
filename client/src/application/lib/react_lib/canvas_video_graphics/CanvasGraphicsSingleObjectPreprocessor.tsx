import * as React from "react";
import {PureComponent} from "react";

import {CanvasGraphicsSingleObjectRenderer} from "./rendering/CanvasGraphicsSingleObjectRenderer";
import {CanvasGraphicsRenderObject} from "./rendering/graphics_objects/index";

export interface ICanvasGraphicsSingleObjectPreprocessorProps {
  object: CanvasGraphicsRenderObject;
}

export class CanvasGraphicsSingleObjectPreprocessor extends PureComponent<ICanvasGraphicsSingleObjectPreprocessorProps> {

  public render(): JSX.Element {
    return <CanvasGraphicsSingleObjectRenderer object={this.props.object}/>;
  }

}
