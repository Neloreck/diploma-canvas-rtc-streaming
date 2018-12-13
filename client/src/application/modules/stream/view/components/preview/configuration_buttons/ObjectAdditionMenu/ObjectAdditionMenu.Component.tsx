import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {PureComponent, ReactNode} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";

// Data.
import {ICanvasObjectDescriptor, renderingService} from "@Module/stream/data/services/rendering";
import {graphicsContextManager, IGraphicsContext} from "@Module/stream/data/store/index";

// View.
import {Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, WithStyles} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {objectAdditionMenuStyle} from "./ObjectAdditionMenu.Style";

// Props.
export interface IObjectAdditionMenuExternalProps extends WithStyles<typeof objectAdditionMenuStyle>, IGraphicsContext {}

export interface IObjectAdditionMenuOwnProps {}

export interface IObjectAdditionMenuProps extends IObjectAdditionMenuOwnProps, IObjectAdditionMenuExternalProps {}

/*
 * Object addition button menu content list.
 */
@Consume<IGraphicsContext, IObjectAdditionMenuProps>(graphicsContextManager)
@Styled(objectAdditionMenuStyle)
export class ObjectAdditionMenu extends PureComponent<IObjectAdditionMenuProps> {

  public render(): ReactNode {
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
  private renderCanvasItem(descriptor: ICanvasObjectDescriptor<any>): ReactNode {
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
