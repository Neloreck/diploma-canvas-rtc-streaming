import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Component, createRef, RefObject} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/@material_ui";

// Data.
import {ISourceContext, sourceContextManager} from "@Module/stream/data/store";

// View.
import {Button, Collapse, Fab, Tooltip, WithStyles} from "@material-ui/core";
import {Add, Remove} from "@material-ui/icons";
import {
  IObjectAdditionMenuExternalProps,
  ObjectAdditionMenu
} from "@Module/stream/view/components/preview/configuration_buttons/ObjectAdditionMenu";
import {objectAdditionButtonStyle} from "./ObjectAdditionButton.Style";

// Props.
export interface IObjectAdditionTooltipState {
  showAdditionWindow: boolean;
}

export interface IObjectAdditionTooltipExternalProps extends ISourceContext, WithStyles<typeof objectAdditionButtonStyle> {}

export interface IObjectAdditionTooltipOwnProps {}

export interface IObjectAdditionTooltipProps extends IObjectAdditionTooltipOwnProps, IObjectAdditionTooltipExternalProps {}

/*
 * Object addition button with menu.
 */
@Consume<ISourceContext, IObjectAdditionTooltipProps>(sourceContextManager)
@Styled(objectAdditionButtonStyle)
export class ObjectAdditionTooltip extends Component<IObjectAdditionTooltipProps, IObjectAdditionTooltipState> {

  public readonly state: IObjectAdditionTooltipState = {
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
          <Fab
            className={classes.addObjectTooltip}
            onClick={this.onToggleShowAdditionWindow}>
            { showAdditionWindow ? <Remove/> : <Add/> }
          </Fab>
        </Tooltip>

        <Collapse in={showAdditionWindow}>
         <ObjectAdditionMenu {...{} as IObjectAdditionMenuExternalProps}/>
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
