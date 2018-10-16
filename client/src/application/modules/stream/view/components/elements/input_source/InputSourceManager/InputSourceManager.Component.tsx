import * as React from "react";
import {Component} from "react";
import {AutoBind} from "redux-cbd";

import {Styled} from "@Lib/react_lib/@material_ui";

import {Button, Collapse, Grid, Modal, SwipeableDrawer, Tooltip} from "@material-ui/core";
import {MoreVert} from "@material-ui/icons";

import {IInputSourcesSelectFormExternalProps, InputSourcesSelectForm} from "../InputSourcesSelectForm";

import {IInputSourceManagerProps, IInputSourceManagerState} from "./InputSourceManager.StateProps";
import {inputSourceManagerStyle} from "./InputSourceManager.Style";

@Styled(inputSourceManagerStyle)
export class InputSourceManager extends Component<IInputSourceManagerProps, IInputSourceManagerState> {

  public readonly state: IInputSourceManagerState = {
    showModal: false
  };

  public render(): JSX.Element {

    const {classes} = this.props;
    const {showModal} = this.state;

    return (
      <Grid className={classes.root}>

        <Tooltip title={"Configure source."} placement={"right"}>
          <Button className={classes.configureSourceTooltip} variant={"fab"} onClick={this.onShowModal}>
            <MoreVert/>
          </Button>
        </Tooltip>

        <SwipeableDrawer
          open={showModal}
          onClose={this.onHideModal}
          onOpen={this.onShowModal}
        >

          <Grid
            className={classes.drawerMenu}
            tabIndex={0}
            role="button"
            container
          >
            <Collapse in={showModal}>

                <InputSourcesSelectForm onInputSourcesChange={() => null as any} {...{} as IInputSourcesSelectFormExternalProps}/>

                <Button color={"primary"} onClick={this.onHideModal}>Save</Button>
                <Button onClick={this.onHideModal}>Close</Button>

            </Collapse>

          </Grid>

        </SwipeableDrawer>

      </Grid>
    );
  }

  @AutoBind
  private onShowModal(): void {
    this.setState({ showModal: true });
  }

  @AutoBind
  private onHideModal(): void {
    this.setState({ showModal: false });
  }

}
