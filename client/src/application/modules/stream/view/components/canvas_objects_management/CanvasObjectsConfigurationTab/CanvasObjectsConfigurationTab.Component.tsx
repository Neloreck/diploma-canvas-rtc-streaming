import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {ChangeEvent, Component, Fragment} from "react";

// Lib.
import {CanvasGraphicsRenderObject} from "@Lib/graphics";
import {Styled} from "@Lib/react_lib/@material_ui";
import {Optional} from "@Lib/ts/type";
import {GeneralUtils} from "@Lib/util/GeneralUtils";

// Data.
import {ICanvasObjectDescriptor, renderingService} from "@Module/stream/data/services/rendering";
import {graphicsContextManager, IGraphicsContext} from "@Module/stream/data/store";

// View.
import {
  Checkbox, FormControlLabel, Grid, Grow, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Switch,
  Typography, WithStyles
} from "@material-ui/core";
import {ArrowDownward, ArrowUpward, Delete, FileCopy} from "@material-ui/icons";
import {CanvasObjectTemplateConfiguration, ICanvasObjectTemplateConfigurationExternalProps} from "@Module/stream/view/components/canvas_objects_management/CanvasObjectTemplateConfiguration";
import {canvasObjectsConfigurationTabStyle} from "./CanvasObjectsConfigurationTab.Style";

// Props.
export interface ICanvasObjectsConfigurationTabState {
  showLayerControls: boolean;
}

export interface ICanvasObjectsConfigurationTabExternalProps extends WithStyles<typeof canvasObjectsConfigurationTabStyle>, IGraphicsContext {}

export interface ICanvasObjectsConfigurationTabOwnProps {}

export interface ICanvasObjectsConfigurationTabProps extends ICanvasObjectsConfigurationTabOwnProps, ICanvasObjectsConfigurationTabExternalProps {}

@Consume<IGraphicsContext, ICanvasObjectsConfigurationTabProps>(graphicsContextManager)
@Styled(canvasObjectsConfigurationTabStyle)
export class CanvasObjectsConfigurationTab extends Component<ICanvasObjectsConfigurationTabProps, ICanvasObjectsConfigurationTabState> {

  public state: ICanvasObjectsConfigurationTabState = {
    showLayerControls: false
  };

  public render(): JSX.Element {

    const {classes, graphicsState: {selectedObject}} = this.props;

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

    const {classes, graphicsState: {objects, selectedObject}, graphicsActions: {swapObjectsByIndex}} = this.props;
    const {showLayerControls} = this.state;

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
          <Grid className={classes.itemListControlsBlock} container alignItems={"center"}>
            <FormControlLabel
              label={"Show Layer Controls"}
              control={<Switch checked={showLayerControls} color={"primary"}  onChange={this.onLayerControlsShowToggle}/>}
            />
          </Grid>
          {
            objects.map((item, idx) => {

              const descriptor: Optional<ICanvasObjectDescriptor<any>> = renderingService.getDescriptor(item);

              if (!descriptor) {
                throw new Error("Descriptor for object was not found, implement it before using in list.");
              }

              return (
                <ListItem
                  key={item.getId()}
                  className={(item === selectedObject ? classes.objectListItemSelected : classes.objectListItem)}
                  onClick={() => this.onConfigurableObjectSelected(item)}>

                  <ListItemText primary={descriptor.name}/>

                  <ListItemSecondaryAction>

                    {
                      showLayerControls
                        ?
                        <Fragment>

                          <IconButton onClick={() => swapObjectsByIndex(idx, idx + 1)} disabled={idx === objects.length - 1}>
                            <ArrowUpward fontSize="small"/>
                          </IconButton>

                          <IconButton onClick={() => swapObjectsByIndex(idx, idx - 1)} disabled={idx === 0}>
                            <ArrowDownward fontSize="small"/>
                          </IconButton>

                          <Checkbox
                            color={"primary"}
                            onChange={() => {
                              item.isDisabled() ? item.setDisabled(false) : item.setDisabled(true);
                              this.forceUpdate();
                            }}
                            checked={!item.isDisabled()}
                          />

                          <IconButton onClick={() => this.onGraphicsItemCopyClicked(item)}> <FileCopy fontSize="small" /> </IconButton>
                        </Fragment>
                        : null
                    }

                    <IconButton onClick={() => this.onGraphicsItemRemoveClicked(item)}> <Delete fontSize="small" /> </IconButton>

                  </ListItemSecondaryAction>

                </ListItem>
              );
            }).reverse()
          }
        </List>
      </Grow>
    );
  }

  private renderSelectedObjectConfigBlock(): Optional<JSX.Element> {

    const {graphicsState: {objects, selectedObject}, graphicsActions: {swapObjectsByIndex}} = this.props;

    if (!selectedObject) {
      return null;
    }

    return (
      <CanvasObjectTemplateConfiguration
        index={objects.indexOf(selectedObject)}
        maxIndex={objects.length - 1}
        object={selectedObject}
        onObjectIndexSwap={swapObjectsByIndex}
        onCancelSelection={this.onSelectionCanceled}
        onChangesApply={this.onObjectChangesApply}
        onSelectedRemove={this.onGraphicsItemRemoveClicked}
        {...{} as ICanvasObjectTemplateConfigurationExternalProps}
      />
    );
  }

  @Bind()
  private onGraphicsItemRemoveClicked(object: CanvasGraphicsRenderObject): void {
    this.props.graphicsActions.removeObject(object);
  }

  @Bind()
  private onGraphicsItemCopyClicked(object: CanvasGraphicsRenderObject): void {
    this.props.graphicsActions.addObject(GeneralUtils.copyInstance(object));
  }

  @Bind()
  private onConfigurableObjectSelected(object: CanvasGraphicsRenderObject) {
    this.props.graphicsActions.selectObject(object);
  }

  @Bind()
  private onSelectionCanceled(): void {
    this.props.graphicsActions.selectObject(null);
  }

  @Bind()
  private onObjectChangesApply(object: CanvasGraphicsRenderObject): void {

    const {graphicsState: {selectedObject}} = this.props;

    if (selectedObject) {
      selectedObject.configuration = Object.assign({}, selectedObject.configuration, object.configuration);
    } else {
      throw new Error("Could not apply settings for unknown object, none is selected.");
    }
  }

  @Bind()
  private onLayerControlsShowToggle(event: ChangeEvent): void {
    this.setState({ showLayerControls: (event.target as any).checked });
  }

}
