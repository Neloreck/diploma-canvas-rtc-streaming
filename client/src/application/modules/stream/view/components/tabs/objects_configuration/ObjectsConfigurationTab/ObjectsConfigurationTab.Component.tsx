import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {ChangeEvent, Component, Fragment} from "react";

// Lib.
import {CanvasGraphicsRenderObject} from "@Lib/graphics";
import {Styled} from "@Lib/react_lib/@material_ui";
import {VerticalDraggableVHResizer} from "@Lib/react_lib/components";
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
import {
  IObjectTemplateConfigurationBlockExternalProps,
  ObjectTemplateConfigurationBlock
} from "@Module/stream/view/components/tabs/objects_configuration/ObjectTemplateConfigurationBlock";
import {objectsConfigurationTabStyle} from "./ObjectsConfigurationTab.Style";

// Props.
export interface IObjectsConfigurationTabState {
  showLayerControls: boolean;
  listWidth?: number;
}

export interface IObjectsConfigurationTabExternalProps extends WithStyles<typeof objectsConfigurationTabStyle>, IGraphicsContext {}

export interface IObjectsConfigurationTabOwnProps {}

export interface IObjectsConfigurationTabProps extends IObjectsConfigurationTabOwnProps, IObjectsConfigurationTabExternalProps {}

@Consume<IGraphicsContext, IObjectsConfigurationTabProps>(graphicsContextManager)
@Styled(objectsConfigurationTabStyle)
export class ObjectsConfigurationTab extends Component<IObjectsConfigurationTabProps, IObjectsConfigurationTabState> {

  public state: IObjectsConfigurationTabState = {
    listWidth: undefined,
    showLayerControls: false
  };

  public render(): JSX.Element {

    const {classes, graphicsState: {selectedObject}} = this.props;
    const {listWidth} = this.state;

    return (
      <Grid className={classes.root} wrap={"nowrap"} container>

        <Grid
          className={classes.objectsList}
          style={{ width: selectedObject !== null && listWidth ? listWidth : undefined}}
        >
          {this.renderObjectsList()}
        </Grid>

        {
          selectedObject !== null
            ?
            <Fragment>
              <VerticalDraggableVHResizer className={classes.resizer} onHeightResize={this.onListResized}/>
              <Grid className={classes.objectsConfigurationBlock}> {this.renderSelectedObjectConfigBlock()} </Grid>
            </Fragment>
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

                    <Grow in={showLayerControls}>
                      <Grid className={classes.additionalListControlButtonsBlock}>
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
                      </Grid>
                    </Grow>

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
      <ObjectTemplateConfigurationBlock
        index={objects.indexOf(selectedObject)}
        maxIndex={objects.length - 1}
        object={selectedObject}
        onObjectIndexSwap={swapObjectsByIndex}
        onCancelSelection={this.onSelectionCanceled}
        onChangesApply={this.onObjectChangesApply}
        onSelectedRemove={this.onGraphicsItemRemoveClicked}
        {...{} as IObjectTemplateConfigurationBlockExternalProps}
      />
    );
  }

  @Bind()
  private onListResized(newWidth: number): void {
    this.setState({ listWidth: newWidth });
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
