import * as React from "react";
import {Component} from "react";
import {AutoBind} from "redux-cbd";

import {Button, Collapse, Grid, Tooltip} from "@material-ui/core";
import {Add, Remove} from "@material-ui/icons";

import {Styled} from "@Lib/react_lib/@material_ui";
import {log} from "@Lib/util/logger";

import {ICanvasObjectDescriptor} from "@Module/stream/data/services/rendering";
import {IStreamStoreState, StreamStoreConnect} from "@Module/stream/data/store";
import {AddGraphicsObjectAction} from "@Module/stream/data/store/graphics";

import {CanvasObjectsAdditionList, ICanvasObjectsAdditionListExternalProps} from "@Module/stream/view/components/elements/canvas_objects_management/CanvasObjectsAdditionList";

import {
  ICanvasObjectAdditionManagerDispatchProps,
  ICanvasObjectAdditionManagerProps,
  ICanvasObjectAdditionManagerState,
  ICanvasObjectAdditionManagerStoreProps
} from "./CanvasObjectAdditionManager.StateProps";
import {canvasObjectAdditionManagerStyle} from "./CanvasObjectAdditionManager.Style";

@Styled(canvasObjectAdditionManagerStyle)
@StreamStoreConnect<ICanvasObjectAdditionManagerStoreProps, ICanvasObjectAdditionManagerDispatchProps, ICanvasObjectAdditionManagerProps>(
  (store: IStreamStoreState) => ({
      objects: []
  }), {
    onObjectAdded: (object: ICanvasObjectDescriptor<any>) => new AddGraphicsObjectAction({ object }),
    onObjectChanged: (object: ICanvasObjectDescriptor<any>) => log.error(object),
    onObjectRemoved: (object: ICanvasObjectDescriptor<any>) => log.error(object)
  }
)
export class CanvasObjectAdditionManager extends Component<ICanvasObjectAdditionManagerProps, ICanvasObjectAdditionManagerState> {

  public readonly state: ICanvasObjectAdditionManagerState = { showAdditionWindow: false };

  public render(): JSX.Element {

    const {classes, onObjectAdded} = this.props;
    const {showAdditionWindow} = this.state;

    return (
      <Grid className={showAdditionWindow ? classes.root : classes.rootEmpty}>

        <Tooltip title={"Add object."} placement={"right"}>
          <Button className={classes.addObjectTooltip} variant={"fab"} onClick={this.onToggleShowAdditionWindow}>
            { showAdditionWindow ? <Remove/> : <Add/> }
          </Button>
        </Tooltip>

        <Collapse in={showAdditionWindow}>
         <CanvasObjectsAdditionList
           onObjectAdded={onObjectAdded}
           {...{} as ICanvasObjectsAdditionListExternalProps}
         />
        </Collapse>

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

  @AutoBind
  private onToggleShowAdditionWindow(): void {
    this.setState({ showAdditionWindow: !this.state.showAdditionWindow });
  }

}
