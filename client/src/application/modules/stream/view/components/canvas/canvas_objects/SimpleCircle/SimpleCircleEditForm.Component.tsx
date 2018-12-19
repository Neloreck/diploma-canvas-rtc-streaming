import * as React from "react";
import {Fragment, PureComponent, ReactNode} from "react";

// Lib.
import {AbstractCanvasGraphicsRenderObject} from "@Lib/graphics";

// Props.
export interface ISimpleCircleEditForm {
  object: AbstractCanvasGraphicsRenderObject;
}

export class SimpleCircleEditForm extends PureComponent<ISimpleCircleEditForm> {

  public render(): ReactNode {

    const {object} = this.props;

    return (
      <Fragment>
        No configuration provided for object: "{object.constructor.name}".
      </Fragment>
    );
  }

}
