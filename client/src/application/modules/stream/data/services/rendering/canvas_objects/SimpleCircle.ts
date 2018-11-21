import {AbstractMovableCircleObject} from "@Lib/react_lib/canvas_video_graphics";

export class SimpleCircle extends AbstractMovableCircleObject {

  public configuration = {
    color: "#92a5ff",
    lineWidth: 3
  };

  public renderSelf(): void {

    const context: CanvasRenderingContext2D = this.getContext();
    const {width: pWidth, height: pHeight}: { width: number, height: number} = this.getPercentageBaseSizing();

    context.strokeStyle = this.configuration.color;
    context.lineWidth = this.configuration.lineWidth;

    context.beginPath();
    context.arc(this.center.x * pWidth, this.center.y * pHeight, this.radius * pWidth, 0, 2 * Math.PI);
    context.stroke();
  }

}
