import * as React from "react";
import {Fragment, PureComponent, ReactNode} from "react";

// Lib.
import {AbstractCanvasGraphicsRenderObject} from "@Lib/graphics";

export interface IVideoFrameEditFormProps {
  object: AbstractCanvasGraphicsRenderObject;
}

export class VideoFrameEditForm extends PureComponent<IVideoFrameEditFormProps> {

  public render(): ReactNode {

    const {object} = this.props;

    return (
      <Fragment>
        No configuration provided for object: "{object.constructor.name}".
      </Fragment>
    );
  }

}
