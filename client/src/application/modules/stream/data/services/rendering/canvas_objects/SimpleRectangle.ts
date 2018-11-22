import {AbstractMovableRectangleObject} from "@Lib/react_lib/canvas_video_graphics";

export class SimpleRectangle extends AbstractMovableRectangleObject {

  public readonly configuration = {
    backgroundColor: "#372",
    color: "#ffeada",
    lineWidth: 3,
    renderBackground: true
  };

  public renderSelf(): void {

    const context: CanvasRenderingContext2D = this.getContext();
    const { width: pWidth, height: pHeight } = this.getPercentageBaseSizing();

    const configuration = this.configuration;

    context.strokeStyle = this.configuration.color;
    context.lineWidth = this.configuration.lineWidth;

    context.beginPath();

    if (configuration.renderBackground) {
      context.fillStyle = configuration.backgroundColor;
      context.fillRect(this.left * pWidth, this.top * pHeight, this.width * pWidth, this.height * pHeight);
    }

    context.rect(this.left * pWidth, this.top * pHeight, this.width * pWidth, this.height * pHeight);
    context.stroke();
    context.closePath();
  }

}
