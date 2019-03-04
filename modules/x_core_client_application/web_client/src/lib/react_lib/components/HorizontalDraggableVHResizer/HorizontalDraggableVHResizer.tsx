import { Bind } from "dreamstate";
import * as React from "react";
import { createRef, PureComponent, ReactNode, RefObject } from "react";
import { MouseEvent as ReactMouseEvent } from "react";

// Lib.
import { removeAnyPageTextSelection } from "@Lib/utils";

// Props.
export interface IHorizontalVHDraggableResizerProps {
  className?: string;
  onHeightResize: (newHeight: number) => void;
  target?: HTMLElement;
}

const wrapperStyle: object = {
  cursor: "ns-resize",
  position: "relative" as "relative"
};

export class HorizontalDraggableVHResizer extends PureComponent<IHorizontalVHDraggableResizerProps> {

  private divElementRef: RefObject<HTMLDivElement> = createRef();
  private isMouseDown: boolean = false;

  public componentDidMount(): void {
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  public componentWillUnmount(): void {
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  public render(): ReactNode {
    return (
      <div
        className={this.props.className}
        style={{ ...wrapperStyle, minHeight: 4 }}
        ref={this.divElementRef}
        onMouseMove={this.handleMouseMove}
        onMouseDown={this.handleMouseDown}
      >
      </div>
    );
  }

  @Bind()
  private handleMouseMove(event: MouseEvent | ReactMouseEvent): void {
    if (this.isMouseDown) {
      this.props.onHeightResize(this.getTargetSizings().height - event.pageY + this.getResizerSizings().height / 2);
      removeAnyPageTextSelection();
    }
  }

  @Bind()
  private handleMouseUp(event: MouseEvent): void {
    this.isMouseDown = false;
  }

  @Bind()
  private handleMouseDown(event: MouseEvent | ReactMouseEvent): void {
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
