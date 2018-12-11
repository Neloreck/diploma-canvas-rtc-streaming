import {Bind} from "@redux-cbd/utils";
import * as React from "react";
import {createRef, PureComponent, RefObject} from "react";
import {MouseEvent} from "react";

import {DocumentUtils} from "@Lib/utils";

// Props.
export interface IVerticalDraggableVHResizer {
  className?: string;
  onHeightResize: (newHeight: number) => void;
  target?: HTMLElement;
}

const style = {
  wrapper: {
    cursor: "ew-resize",
    position: "relative" as "relative"
  }
};

export class VerticalDraggableVHResizer extends PureComponent<IVerticalDraggableVHResizer> {

  private divElementRef: RefObject<HTMLDivElement> = createRef();
  private isMouseDown: boolean = false;

  public componentDidMount(): void {
    // @ts-ignore
    document.addEventListener("mousemove", this.handleMouseMove);
    // @ts-ignore
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  public componentWillUnmount(): void {
    // @ts-ignore
    document.removeEventListener("mousemove", this.handleMouseMove);
    // @ts-ignore
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  public render(): JSX.Element {
    return (
      <div
        className={this.props.className}
        style={{ ...style.wrapper, minWidth: "4px"}}
        ref={this.divElementRef}
        onMouseMove={this.handleMouseMove}
        onMouseDown={this.handleMouseDown}
      >
      </div>
    );
  }

  @Bind()
  private handleMouseMove(event: MouseEvent<HTMLDivElement>): void {
    if (this.isMouseDown) {
      this.props.onHeightResize(event.pageX - this.getTargetSizings().left - this.getResizerSizings().width / 2);
      DocumentUtils.removeAnyPageTextSelection();
    }
  }

  @Bind()
  private handleMouseUp(event: MouseEvent<HTMLDivElement>): void {
    this.isMouseDown = false;
  }

  @Bind()
  private handleMouseDown(event: MouseEvent<HTMLDivElement>): void {
    this.isMouseDown = true;
  }

  private getTargetSizings(): ClientRect {
    return (this.props.target || document.body).getBoundingClientRect();
  }

  private getResizerSizings(): ClientRect {
    return this.getResizerDiv().getBoundingClientRect();
  }

  private getResizerDiv(): HTMLDivElement {
    return this.divElementRef.current as HTMLDivElement;
  }

}
