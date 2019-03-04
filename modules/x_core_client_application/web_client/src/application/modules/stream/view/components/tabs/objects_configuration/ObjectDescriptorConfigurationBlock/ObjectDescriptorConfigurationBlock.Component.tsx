import * as React from "react";
import { Component, ReactNode } from "react";

// Lib.
import { Styled } from "@Lib/decorators";
import { AbstractCanvasGraphicsRenderObject } from "@Lib/graphics";

// Data.
import { CanvasObjectConfigurationFormBuilder } from "@Module/stream/lib/graphics";
import { ICanvasObjectDescriptor } from "@Module/stream/lib/graphics/description";

// View.
import { Grid, WithStyles } from "@material-ui/core";
import { objectDescriptorConfigurationBlockStyle } from "./ObjectDescriptorConfigurationBlock.Style";

// Props.
export interface IObjectDescriptorConfigurationBlockState {}
export interface IObjectDescriptorConfigurationBlockInjectedProps extends WithStyles<typeof objectDescriptorConfigurationBlockStyle> {}
export interface IObjectDescriptorConfigurationBlockOwnProps {
  object: AbstractCanvasGraphicsRenderObject<any>;
  descriptor: ICanvasObjectDescriptor<any>;
}

export interface IObjectDescriptorConfigurationBlockProps extends IObjectDescriptorConfigurationBlockOwnProps, IObjectDescriptorConfigurationBlockInjectedProps {}

@Styled(objectDescriptorConfigurationBlockStyle)
export class ObjectDescriptorConfigurationBlock extends Component<IObjectDescriptorConfigurationBlockProps, IObjectDescriptorConfigurationBlockState> {

  public state: IObjectDescriptorConfigurationBlockState = {};

  public render(): ReactNode {

    const { classes, object, descriptor } = this.props;

    return (
      <Grid className={classes.root} wrap={"nowrap"} direction={"column"} container>
        <CanvasObjectConfigurationFormBuilder object={object} descriptor={descriptor}/>
      </Grid>
    );
  }

}
