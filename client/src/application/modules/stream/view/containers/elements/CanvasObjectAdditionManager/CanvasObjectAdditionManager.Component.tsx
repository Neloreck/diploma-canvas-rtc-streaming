import * as React from "react";
import {Component, createRef, RefObject} from "react";

import {Bind} from "@redux-cbd/utils";

import {Button, Collapse, Tooltip} from "@material-ui/core";
import {Add, Remove} from "@material-ui/icons";

import {Styled} from "@Lib/react_lib/@material_ui";
import {log} from "@Lib/util/logger";

import {ICanvasObjectDescriptor} from "@Module/stream/data/services/rendering";
import {IStreamStoreState, StreamStoreConnect} from "@Module/stream/data/store";
import {AddGraphicsObjectAction} from "@Module/stream/data/store/graphics";

import {
  CanvasObjectsAdditionList, ICanvasObjectsAdditionListExternalProps
} from "@Module/stream/view/components/elements/canvas_objects_management/CanvasObjectsAdditionList";

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
    inputStream: store.source.inputStream
  }), {
    onObjectAdded: (object: ICanvasObjectDescriptor<any>) => new AddGraphicsObjectAction({ object }),
    onObjectChanged: (object: ICanvasObjectDescriptor<any>) => log.error(object),
    onObjectRemoved: (object: ICanvasObjectDescriptor<any>) => log.error(object)
  }
)
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

    const {classes, onObjectAdded, inputStream} = this.props;
    const {showAdditionWindow} = this.state;

    return (
        <div className={showAdditionWindow ? classes.root : classes.rootEmpty} ref={this.contentRef}>

          <Tooltip title={"Add object."} placement={"right"}>
            <Button className={classes.addObjectTooltip}
                    disabled={inputStream === null}
                    variant={"fab"}
                    onClick={this.onToggleShowAdditionWindow}>
              { showAdditionWindow ? <Remove/> : <Add/> }
            </Button>
          </Tooltip>

          <Collapse in={showAdditionWindow}>
           <CanvasObjectsAdditionList
             onObjectAdded={onObjectAdded}
             {...{} as ICanvasObjectsAdditionListExternalProps}
           />
          </Collapse>

        </div>
    );
  }

  @Bind
  private handleWindowClick(event: MouseEvent): void {

    const target: HTMLUListElement = this.contentRef.current && this.contentRef.current.querySelector("ul");
    const isAnotherComponentClicked: boolean = (target && !target.contains(event.target as Node));

    if (this.state.showAdditionWindow === true && isAnotherComponentClicked === true) {
      this.setState({ showAdditionWindow: false });
    }
  }

  @Bind
  private onObjectAdded(): void {
    this.props.onObjectAdded("" as any);
  }

  @Bind
  private onObjectRemoved(): void {
    this.props.onObjectRemoved("" as any);
  }

  @Bind
  private onObjectChanged(): void {
    this.props.onObjectChanged("" as any);
  }

  @Bind
  private onToggleShowAdditionWindow(event: React.MouseEvent<any>): void {
    event.stopPropagation();
    this.setState({ showAdditionWindow: !this.state.showAdditionWindow });
  }

}
