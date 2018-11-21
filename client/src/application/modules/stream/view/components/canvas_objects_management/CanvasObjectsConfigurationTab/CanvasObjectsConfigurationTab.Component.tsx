import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Component} from "react";

import {Styled} from "@Lib/react_lib/@material_ui";
import {CanvasGraphicsRenderObject} from "@Lib/react_lib/canvas_video_graphics";
import {Optional} from "@Lib/ts/type";

import {ICanvasObjectDescriptor, renderingService} from "@Module/stream/data/services/rendering";
import {graphicsContext, IGraphicsContextState} from "@Module/stream/data/store";

import {
  Avatar,
  Button,
  Grid,
  Grow,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  WithStyles
} from "@material-ui/core";
import {Delete, Image} from "@material-ui/icons";
import {CanvasObjectTemplateConfiguration, ICanvasObjectTemplateConfigurationExternalProps} from "@Module/stream/view/components/canvas_objects_management/CanvasObjectTemplateConfiguration";

import {canvasObjectsConfigurationTabStyle} from "./CanvasObjectsConfigurationTab.Style";

export interface ICanvasObjectsConfigurationTabState {
  selectedObject: Optional<CanvasGraphicsRenderObject>;
}

export interface ICanvasObjectsConfigurationTabExternalProps extends WithStyles<typeof canvasObjectsConfigurationTabStyle>, IGraphicsContextState {}

export interface ICanvasObjectsConfigurationTabOwnProps {}

export interface ICanvasObjectsConfigurationTabProps extends ICanvasObjectsConfigurationTabOwnProps, ICanvasObjectsConfigurationTabExternalProps {}

@Consume<IGraphicsContextState, ICanvasObjectsConfigurationTabProps>(graphicsContext)
@Styled(canvasObjectsConfigurationTabStyle)
export class CanvasObjectsConfigurationTab extends Component<ICanvasObjectsConfigurationTabProps, ICanvasObjectsConfigurationTabState> {

  public state: ICanvasObjectsConfigurationTabState = {
    selectedObject: null
  };

  public render(): JSX.Element {

    const {selectedObject} = this.state;
    const {classes} = this.props;

    return (
      <Grid className={classes.root} container>

        <Grid className={classes.objectsList}>
          {this.renderObjectsList()}
        </Grid>

        {
          selectedObject !== null
            ?
            <Grow in={true}>
              <Grid className={classes.objectsConfigurationBlock}> {this.renderSelectedObjectConfigBlock()} </Grid>
            </Grow>
            : null
        }

      </Grid>
    );
  }

  private renderObjectsList(): JSX.Element {

    const {classes, graphicsState: {objects}} = this.props;
    const {selectedObject} = this.state;

    if (objects.length === 0) {
      return (
        <Grid className={classes.noGraphicsMessage} alignItems={"center"} justify={"center"} container>
          <Typography variant={"h5"} gutterBottom> Create at least one graphics item for configuration. </Typography>
        </Grid>
      );
    }

    return (
      <Grow in={true}>
        <List>
          {
            objects.map((item, idx) => {

              const descriptor: Optional<ICanvasObjectDescriptor<any>> = renderingService.getDescriptor(item);

              if (!descriptor) {
                throw new Error("Descriptor for object was not found, implement it before using in list.");
              }

              return (
                <ListItem key={idx} className={(item === selectedObject ? classes.objectListItemSelected : classes.objectListItem)}
                          onClick={() => this.onConfigurableObjectSelected(item)}>

                  <Avatar>
                    <Image/>
                  </Avatar>

                  <ListItemText primary={descriptor.name} secondary={descriptor.description} />

                  <ListItemSecondaryAction>
                    <Button onClick={() => this.onGraphicsItemRemoveClicked(item)}>
                      <Delete className={classes.objectListItemSecondary}/>
                    </Button>
                  </ListItemSecondaryAction>

                </ListItem>
              );
            })
          }
        </List>
      </Grow>
    );
  }

  private renderSelectedObjectConfigBlock(): Optional<JSX.Element> {

    const {selectedObject} = this.state;

    if (!selectedObject) {
      return null;
    }

    return <CanvasObjectTemplateConfiguration object={selectedObject}
                                              onCancelSelection={this.onSelectionCanceled}
                                              onSelectedRemove={this.onGraphicsItemRemoveClicked}
                                              {...{} as ICanvasObjectTemplateConfigurationExternalProps}/>;
  }

  @Bind()
  private onGraphicsItemRemoveClicked(object: CanvasGraphicsRenderObject): void {

    if (object === this.state.selectedObject) {
      this.setState({selectedObject: null});
    }

    this.props.graphicsActions.removeObject(object);
  }

  @Bind()
  private onConfigurableObjectSelected(object: CanvasGraphicsRenderObject) {
    this.setState({selectedObject: object});
  }

  @Bind()
  private onSelectionCanceled(): void {
    this.setState({selectedObject: null});
  }

}
