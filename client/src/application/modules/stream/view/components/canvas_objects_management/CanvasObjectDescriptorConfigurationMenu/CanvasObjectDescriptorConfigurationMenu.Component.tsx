import * as React from "react";
import {Component} from "react";

// Lib.
import {CanvasGraphicsRenderObject} from "@Lib/graphics";
import {Styled} from "@Lib/react_lib/@material_ui";

// View.
import {Grid, Input, WithStyles} from "@material-ui/core";
import {ICanvasObjectDescriptor} from "@Module/stream/data/services/rendering";
import {canvasObjectDescriptorConfigurationMenuStyle} from "./CanvasObjectDescriptorConfigurationMenu.Style";

// Props.
export interface ICanvasObjectDescriptorConfigurationMenuState {}

export interface ICanvasObjectDescriptorConfigurationMenuExternalProps extends WithStyles<typeof canvasObjectDescriptorConfigurationMenuStyle> {}

export interface ICanvasObjectDescriptorConfigurationMenuOwnProps {
  object: CanvasGraphicsRenderObject;
  descriptor: ICanvasObjectDescriptor<any>;
}

export interface ICanvasObjectDescriptorConfigurationMenuProps extends ICanvasObjectDescriptorConfigurationMenuOwnProps, ICanvasObjectDescriptorConfigurationMenuExternalProps {}

@Styled(canvasObjectDescriptorConfigurationMenuStyle)
export class CanvasObjectDescriptorConfigurationMenu extends Component<ICanvasObjectDescriptorConfigurationMenuProps, ICanvasObjectDescriptorConfigurationMenuState> {

  public state: ICanvasObjectDescriptorConfigurationMenuState = {};

  public render(): JSX.Element {

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
