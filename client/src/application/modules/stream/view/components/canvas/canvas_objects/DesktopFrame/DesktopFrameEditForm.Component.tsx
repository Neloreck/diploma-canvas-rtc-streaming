import * as React from "react";
import {Fragment, PureComponent, ReactNode} from "react";

// Lib.
import {AbstractCanvasGraphicsRenderObject} from "@Lib/graphics";

export interface IDesktopFrameEditForm {
  object: AbstractCanvasGraphicsRenderObject;
}

export class DesktopFrameEditForm extends PureComponent<IDesktopFrameEditForm> {

  public render(): ReactNode {

    const {object} = this.props;

    return (
      <Fragment>
        No configuration provided for object: "{object.constructor.name}".
      </Fragment>
    );
  }

}
