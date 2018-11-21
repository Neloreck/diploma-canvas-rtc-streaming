import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Component, createRef, RefObject} from "react";

import {Styled} from "@Lib/react_lib/@material_ui";

import {ISourceContextState, sourceContext} from "@Module/stream/data/store";
import {CanvasObjectAdditionButtonTooltipContent, ICanvasObjectAdditionButtonTooltipContentExternalProps} from "@Module/stream/view/components/canvas_objects_management/CanvasObjectAdditionButtonTooltipContent";

import {Button, Collapse, Tooltip, WithStyles} from "@material-ui/core";
import {Add, Remove} from "@material-ui/icons";

import {canvasObjectAdditionButtonTooltipStyle} from "./CanvasObjectAdditionButtonTooltip.Style";

export interface ICanvasObjectAdditionButtonTooltipState {
  showAdditionWindow: boolean;
}

export interface ICanvasObjectAdditionButtonTooltipExternalProps extends ISourceContextState, WithStyles<typeof canvasObjectAdditionButtonTooltipStyle> {}

export interface ICanvasObjectAdditionButtonTooltipOwnProps {}

export interface ICanvasObjectAdditionButtonTooltipProps extends ICanvasObjectAdditionButtonTooltipOwnProps, ICanvasObjectAdditionButtonTooltipExternalProps {}

/*
 * Object addition button with menu.
 */
@Consume<ISourceContextState, ICanvasObjectAdditionButtonTooltipProps>(sourceContext)
@Styled(canvasObjectAdditionButtonTooltipStyle)
export class CanvasObjectAdditionButtonTooltip extends Component<ICanvasObjectAdditionButtonTooltipProps, ICanvasObjectAdditionButtonTooltipState> {

  public readonly state: ICanvasObjectAdditionButtonTooltipState = {
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
          <Button
            className={classes.addObjectTooltip} variant={"fab"}
            onClick={this.onToggleShowAdditionWindow}>
            { showAdditionWindow ? <Remove/> : <Add/> }
          </Button>
        </Tooltip>

        <Collapse in={showAdditionWindow}>
         <CanvasObjectAdditionButtonTooltipContent{...{} as ICanvasObjectAdditionButtonTooltipContentExternalProps}/>
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
