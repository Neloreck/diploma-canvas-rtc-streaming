import * as React from "react";
import {Component} from "react";

import {Styled} from "@Lib/react_lib/@material_ui";

import {Avatar, Button, Collapse, Grid, List, ListItem, ListItemText, Tooltip, WithStyles} from "@material-ui/core";
import {Image} from "@material-ui/icons";

import {canvasObjectsConfigurationTabStyle} from "./CanvasObjectsConfigurationTab.Style";
import {Consume} from "@redux-cbd/context";
import {graphicsContext, IGraphicsContextState} from "@Module/stream/data/store";

export interface ICanvasObjectsConfigurationTabExternalProps extends WithStyles<typeof canvasObjectsConfigurationTabStyle>, IGraphicsContextState {}

export interface ICanvasObjectsConfigurationTabOwnProps {}

export interface ICanvasObjectsConfigurationTabProps extends ICanvasObjectsConfigurationTabOwnProps, ICanvasObjectsConfigurationTabExternalProps {}

@Consume<IGraphicsContextState, ICanvasObjectsConfigurationTabProps>(graphicsContext)
@Styled(canvasObjectsConfigurationTabStyle)
export class CanvasObjectsConfigurationTab extends Component<ICanvasObjectsConfigurationTabProps> {

  public render(): JSX.Element {

    const {classes, } = this.props;

    return (
      <Grid className={classes.root} container>

        <Grid className={classes.objectsList}>
          {this.renderObjectsList()}
        </Grid>

        <Grid className={classes.objectsConfigurationBlock}>
          {this.renderSelectedObjectConfigBlock()}
        </Grid>

      </Grid>
    );
  }

  private renderObjectsList(): JSX.Element {

    const {graphicsState: {objects}} = this.props;

    return (
      <List>

        {
          objects.map((item, idx) => (
            <ListItem key={idx}>
              <Avatar>
                <Image/>
              </Avatar>
              <ListItemText primary="Item" secondary={JSON.stringify(Object.keys(item))} />
            </ListItem>
          ))
        }

      </List>
    );
  }

  private renderSelectedObjectConfigBlock(): JSX.Element {
    return (
      <div>
        123
      </div>
    );
  }

}
