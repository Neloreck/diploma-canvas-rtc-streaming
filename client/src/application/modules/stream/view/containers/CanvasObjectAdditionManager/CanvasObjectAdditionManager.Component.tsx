import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Component, createRef, RefObject} from "react";

import {Styled} from "@Lib/react_lib/@material_ui";

import {ISourceContextState, sourceContext} from "@Module/stream/data/store";
import {CanvasObjectsAdditionList, ICanvasObjectsAdditionListExternalProps} from "@Module/stream/view/components/canvas_objects_management/CanvasObjectsAdditionList";

import {Button, Collapse, Tooltip, WithStyles} from "@material-ui/core";
import {Add, Remove} from "@material-ui/icons";

import {canvasObjectAdditionManagerStyle} from "./CanvasObjectAdditionManager.Style";

export interface ICanvasObjectAdditionManagerState {
  showAdditionWindow: boolean;
}

export interface ICanvasObjectAdditionManagerExternalProps extends ISourceContextState, WithStyles<typeof canvasObjectAdditionManagerStyle> {}

export interface ICanvasObjectAdditionManagerOwnProps {}

export interface ICanvasObjectAdditionManagerProps extends ICanvasObjectAdditionManagerOwnProps, ICanvasObjectAdditionManagerExternalProps {}

@Consume<ISourceContextState, ICanvasObjectAdditionManagerProps>(sourceContext)
@Styled(canvasObjectAdditionManagerStyle)
export class CanvasObjectAdditionManager extends Component<ICanvasObjectAdditionManagerProps, ICanvasObjectAdditionManagerState> {

  public readonly state: ICanvasObjectAdditionManagerState = {
    showAdditionWindow: false
  };

  private readonly contentRef: RefObject<any> = createRef();

  public componentDidMount(): void {
    window.addEventListener("mousedown", this.handleWindowClick);
  }

  public componentWillUnmount(): void {
    window.removeEventListener("mousedown", this.handleWindowClick);
  }

  public render(): JSX.Element {
    const {classes} = this.props;
    const {showAdditionWindow} = this.state;

    return (
        <div className={showAdditionWindow ? classes.root : classes.rootEmpty} ref={this.contentRef}>

          <Tooltip title={"Add object."} placement={"right"}>
              <Button className={classes.addObjectTooltip}
                    variant={"fab"}
                    onClick={this.onToggleShowAdditionWindow}>
                { showAdditionWindow ? <Remove/> : <Add/> }
              </Button>
          </Tooltip>

          <Collapse in={showAdditionWindow}>
           <CanvasObjectsAdditionList{...{} as ICanvasObjectsAdditionListExternalProps}/>
          </Collapse>

        </div>
    );
  }

  @Bind()
  private handleWindowClick(event: MouseEvent): void {

    const target: HTMLUListElement = this.contentRef.current && this.contentRef.current.querySelector("ul");
    const isAnotherComponentClicked: boolean = (target && !target.contains(event.target as Node));

    if (this.state.showAdditionWindow === true && isAnotherComponentClicked === true) {
      this.setState({ showAdditionWindow: false });
    }
  }

  @Bind()
  private onToggleShowAdditionWindow(event: React.MouseEvent<any>): void {
    const {sourceState: {inputStream}} = this.props;

    event.stopPropagation();

    if (inputStream === null) {
      return;
    }

    this.setState({ showAdditionWindow: !this.state.showAdditionWindow });
  }

}
