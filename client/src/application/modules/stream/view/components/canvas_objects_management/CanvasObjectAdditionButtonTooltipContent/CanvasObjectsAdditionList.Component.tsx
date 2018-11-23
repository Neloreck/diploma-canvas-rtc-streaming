import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {PureComponent} from "react";

import {Styled} from "@Lib/react_lib/@material_ui";

import {ICanvasObjectDescriptor, renderingService} from "@Module/stream/data/services/rendering";
import {graphicsContextManager, IGraphicsContext} from "@Module/stream/data/store/index";

import {Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, WithStyles} from "@material-ui/core";
import {Add} from "@material-ui/icons";

import {canvasObjectAdditionButtonTooltipContentStyle} from "./CanvasObjectAdditionButtonTooltipContent.Style";

export interface ICanvasObjectAdditionButtonTooltipContentExternalProps extends WithStyles<typeof canvasObjectAdditionButtonTooltipContentStyle>, IGraphicsContext {}

export interface ICanvasObjectAdditionButtonTooltipContentOwnProps {}

export interface ICanvasObjectAdditionButtonTooltipContentProps extends ICanvasObjectAdditionButtonTooltipContentOwnProps, ICanvasObjectAdditionButtonTooltipContentExternalProps {}

/*
 * Object addition button menu content list.
 */
@Consume<IGraphicsContext, ICanvasObjectAdditionButtonTooltipContentProps>(graphicsContextManager)
@Styled(canvasObjectAdditionButtonTooltipContentStyle)
export class CanvasObjectAdditionButtonTooltipContent extends PureComponent<ICanvasObjectAdditionButtonTooltipContentProps> {

  public render(): JSX.Element {
    const {classes} = this.props;

    return (
      <Grid className={classes.root}>
        <List>
          {renderingService.getRenderingDescriptors().map(this.renderCanvasItem)}
        </List>
      </Grid>
    );
  }

  @Bind()
  private renderCanvasItem(descriptor: ICanvasObjectDescriptor<any>): JSX.Element {
    const {classes} = this.props;

    return (
      <ListItem key={"RI-" + descriptor.prototype.constructor.name} className={classes.descriptionItem}>
        <ListItemText primary={descriptor.name}/>
        <ListItemSecondaryAction className={classes.descriptorItemSecondary}>
          <IconButton aria-label="Add" onClick={() => this.onCanvasObjectAdded(descriptor)}>
            <Add/>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  @Bind()
  private onCanvasObjectAdded(descriptor: ICanvasObjectDescriptor<any>): void {
    this.props.graphicsActions.addObject(new descriptor.prototype.constructor());
  }

}
