import * as React from "react";
import {Component, ReactNode} from "react";

// Lib.
import {AbstractCanvasGraphicsRenderObject} from "@Lib/graphics";
import {Styled} from "@Lib/react_lib/mui";

// View.
import {Grid, Input, WithStyles} from "@material-ui/core";
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
      <Grid className={classes.root} container={true} direction={"column"}>
        {
          Object
            .keys(object.configuration)
            .map((key, idx) => {
              return (
                <Grid key={idx} container justify={"space-between"} alignItems={"center"}>

                  {JSON.stringify(key)}

                  <Input
                    value={object.configuration[key]}
                    onChange={(event) => {
                      object.configuration[key] = event.target.value;
                      this.forceUpdate();
                    }}
                  />

                </Grid>
            );
          })
        }
      </Grid>
    );
  }

}
