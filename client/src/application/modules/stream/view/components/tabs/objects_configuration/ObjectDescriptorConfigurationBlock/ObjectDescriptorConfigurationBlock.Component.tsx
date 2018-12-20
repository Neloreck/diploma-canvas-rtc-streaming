import * as React from "react";
import {Component, ReactNode} from "react";

// Lib.
import {AbstractCanvasGraphicsRenderObject} from "@Lib/graphics";
import {Styled} from "@Lib/react_lib/mui";

// Data.
import {CanvasObjectConfigurationFormBuilder} from "@Module/stream/lib/graphics";

// View.
import {Grid, WithStyles} from "@material-ui/core";
import {ICanvasObjectDescriptor} from "@Module/stream/data/services/rendering";
import {objectDescriptorConfigurationBlockStyle} from "./ObjectDescriptorConfigurationBlock.Style";

// Props.
export interface IObjectDescriptorConfigurationBlockState {}
export interface IObjectDescriptorConfigurationBlockExternalProps extends WithStyles<typeof objectDescriptorConfigurationBlockStyle> {}
export interface IObjectDescriptorConfigurationBlockOwnProps {
  object: AbstractCanvasGraphicsRenderObject;
  descriptor: ICanvasObjectDescriptor<any>;
}

export interface IObjectDescriptorConfigurationBlockProps extends IObjectDescriptorConfigurationBlockOwnProps, IObjectDescriptorConfigurationBlockExternalProps {}

@Styled(objectDescriptorConfigurationBlockStyle)
export class ObjectDescriptorConfigurationBlock extends Component<IObjectDescriptorConfigurationBlockProps, IObjectDescriptorConfigurationBlockState> {

  public state: IObjectDescriptorConfigurationBlockState = {};

  public render(): ReactNode {

    const {classes, object, descriptor} = this.props;

    return (
      <Grid className={classes.root} wrap={"nowrap"} direction={"column"} container>
        <CanvasObjectConfigurationFormBuilder object={object} descriptor={descriptor}/>
      </Grid>
    );
  }

}
