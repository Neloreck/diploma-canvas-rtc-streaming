import * as React from "react";
import { Fragment, PureComponent, ReactNode } from "react";

// Lib.
import { AbstractCanvasGraphicsRenderObject } from "@Lib/graphics";

export interface INoControlProvidedFormProps {
  object: AbstractCanvasGraphicsRenderObject<any>;
}

export class NoControlProvidedForm extends PureComponent<INoControlProvidedFormProps> {

  public render(): ReactNode {

    const { object } = this.props;

    return (
      <Fragment>
        No configuration provided for object: "{object.constructor.name}".
      </Fragment>
    );
  }

}
