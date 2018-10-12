import * as React from "react";
import {Component} from "react";
import {AutoBind} from "redux-cbd";

import {Button, Grid, Tooltip} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import {Styled} from "@Lib/react_lib/@material_ui";
import {log} from "@Lib/util/logger";

import {IStreamStoreState, StreamStoreConnect} from "@Module/stream/data/store";

import {
  ICanvasObjectAdditionManagerDispatchProps,
  ICanvasObjectAdditionManagerProps,
  ICanvasObjectAdditionManagerStoreProps
} from "./CanvasObjectAdditionManager.StateProps";
import {canvasObjectAdditionManagerStyle} from "./CanvasObjectAdditionManager.Style";

@Styled(canvasObjectAdditionManagerStyle)
@StreamStoreConnect<ICanvasObjectAdditionManagerStoreProps, ICanvasObjectAdditionManagerDispatchProps, ICanvasObjectAdditionManagerProps>(
  (store: IStreamStoreState) => ({
      objects: []
  }), {
    onObjectAdded: (object) => log.error("1"),
    onObjectChanged: (object) => log.error("1"),
    onObjectRemoved: (object) => log.error("1")
  }
)
export class CanvasObjectAdditionManager extends Component<ICanvasObjectAdditionManagerProps> {

  public render(): JSX.Element {

    const {classes} = this.props;

    return (
      <Grid className={this.props.classes.root}>

        <Tooltip title={"Add object."} placement={"right"}>
          <Button className={classes.addObjectTooltip} variant={"fab"}>
            <AddIcon/>
          </Button>
        </Tooltip>

      </Grid>
    );
  }

  @AutoBind
  private onObjectAdded(): void {
    this.props.onObjectAdded("" as any);
  }

  @AutoBind
  private onObjectRemoved(): void {
    this.props.onObjectRemoved("" as any);
  }

  @AutoBind
  private onObjectChanged(): void {
    this.props.onObjectChanged("" as any);
  }

}
