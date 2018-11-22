import {AbstractMovableCircleObject} from "@Lib/react_lib/canvas_video_graphics";

export class SimpleCircle extends AbstractMovableCircleObject {

  public configuration = {
    backgroundColor: "#555",
    color: "#92a5ff",
    lineWidth: 3,
    renderBackground: true
  };

  public renderSelf(): void {

    const context: CanvasRenderingContext2D = this.getContext();
    const {width: pWidth, height: pHeight}: { width: number, height: number} = this.getPercentageBaseSizing();
    const configuration = this.configuration;

    context.strokeStyle = configuration.color;
    context.lineWidth = configuration.lineWidth;

    context.beginPath();

    context.arc(this.center.x * pWidth, this.center.y * pHeight, this.radius * pWidth, 0, 2 * Math.PI);

    if (configuration.renderBackground) {
      context.fillStyle = configuration.backgroundColor;
      context.fill();
    }

    context.stroke();
  }

}
