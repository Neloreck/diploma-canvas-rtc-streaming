import * as React from "react";
import {Component} from "react";
import {AutoBind} from "redux-cbd";

import {
  Avatar, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText
} from "@material-ui/core";

import {Add, MoreVert} from "@material-ui/icons";

import {Styled} from "@Lib/react_lib/@material_ui";

import {ICanvasObjectDescriptor, RenderingService} from "@Module/stream/data/services/rendering";

import {ICanvasObjectAdditionState, ICanvasObjectsAdditionListProps} from "./CanvasObjectsAdditionList.StateProps";
import {canvasObjectsAdditionListStyle} from "./CanvasObjectsAdditionList.Style";

@Styled(canvasObjectsAdditionListStyle)
export class CanvasObjectsAdditionList extends Component<ICanvasObjectsAdditionListProps, ICanvasObjectAdditionState> {

  public render(): JSX.Element {

    const {classes} = this.props;

    return (
      <Grid className={classes.root}>
        <List>
          {RenderingService.getRenderingDescriptors().map(this.renderCanvasItem)}
        </List>
      </Grid>
    );
  }

  @AutoBind
  private renderCanvasItem(descriptor: ICanvasObjectDescriptor<any>): JSX.Element {

    const {classes, onObjectAdded} = this.props;

    return (
      <ListItem key={"RI-" + descriptor.prototype.constructor.name} className={classes.descriptionItem}>
        <ListItemText primary={descriptor.name}/>
        <ListItemSecondaryAction className={classes.descriptorItemSecondary}>
          <IconButton aria-label="Add" onClick={() => onObjectAdded(descriptor)}>
            <Add/>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

}
