import {AbstractMovableRectangleObject} from "@Lib/graphics";

export class SimpleRectangle extends AbstractMovableRectangleObject {

  public readonly configuration = {
    backgroundColor: "#e9e5e2",
    borderColor: "#24242b",
    borderWidth: 4,
    renderBackground: true
  };

  public renderSelf(): void {

    const context: CanvasRenderingContext2D = this.getContext();
    const { width: pWidth, height: pHeight } = this.getPercentageBaseSizing();

    const configuration = this.configuration;

    context.strokeStyle = this.configuration.borderColor;
    context.lineWidth = this.configuration.borderWidth;

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
