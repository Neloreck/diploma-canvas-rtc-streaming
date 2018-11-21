import {AbstractMovableRectangleObject} from "@Lib/react_lib/canvas_video_graphics";

export class SimpleRectangle extends AbstractMovableRectangleObject {

  public readonly configuration = {
    color: "#ffeada",
    lineWidth: 3
  };

  public renderSelf(): void {

    const context: CanvasRenderingContext2D = this.getContext();
    const { width: pWidth, height: pHeight } = this.getPercentageBaseSizing();

    context.strokeStyle = this.configuration.color;
    context.lineWidth = this.configuration.lineWidth;

    context.beginPath();
    context.rect(this.left * pWidth, this.top * pHeight, this.width * pWidth, this.height * pHeight);
    context.stroke();
    context.closePath();
  }

}
