import {Consume} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {Component, createRef, ReactNode, RefObject} from "react";

// Lib.
import {Styled} from "@Lib/react_lib/mui";

// Data.
import {ISourceContext, sourceContextManager} from "@Module/stream/data/store";

// View.
import {Collapse, Fab, Tooltip, WithStyles} from "@material-ui/core";
import {Add, Remove} from "@material-ui/icons";
import {
  IObjectAdditionMenuExternalProps,
  ObjectAdditionMenu
} from "@Module/stream/view/components/preview/configuration_buttons/ObjectAdditionMenu";
import {objectAdditionButtonStyle} from "./ObjectAdditionButton.Style";

// Props.
export interface IObjectAdditionButtonState {
  showAdditionWindow: boolean;
}

export interface IObjectAdditionButtonExternalProps extends ISourceContext, WithStyles<typeof objectAdditionButtonStyle> {}
export interface IObjectAdditionButtonOwnProps {}
export interface IObjectAdditionButtonProps extends IObjectAdditionButtonOwnProps, IObjectAdditionButtonExternalProps {}

/*
 * Object addition button with menu.
 */
@Consume(sourceContextManager)
@Styled(objectAdditionButtonStyle)
export class ObjectAdditionButton extends Component<IObjectAdditionButtonProps, IObjectAdditionButtonState> {

  public readonly state: IObjectAdditionButtonState = {
    showAdditionWindow: false
  };

  private readonly contentRef: RefObject<any> = createRef();

  public componentDidMount(): void {
    window.addEventListener("mousedown", this.handleWindowClick);
  }

  public componentWillUnmount(): void {
    window.removeEventListener("mousedown", this.handleWindowClick);
  }

  public render(): ReactNode {
    const {classes} = this.props;
    const {showAdditionWindow} = this.state;

    return (
      <div className={showAdditionWindow ? classes.root : classes.rootEmpty} ref={this.contentRef}>

        <Tooltip title={"Add object."} placement={"right"}>
          <Fab
            className={classes.additionButton}
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

  // Todo: Mui utility without manual implementation.
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

    event.stopPropagation();

    this.setState({ showAdditionWindow: !this.state.showAdditionWindow });
  }

}
