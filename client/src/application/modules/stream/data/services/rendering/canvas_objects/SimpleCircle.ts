import {AbstractMovableCircleObject} from "@Lib/graphics";

export class SimpleCircle extends AbstractMovableCircleObject {

  public configuration = {
    backgroundColor: "#e5e7e9",
    borderColor: "#24242b",
    borderWidth: 4,
    renderBackground: true
  };

  public renderSelf(): void {

    const context: CanvasRenderingContext2D = this.getContext();
    const {width: pWidth, height: pHeight}: { width: number, height: number} = this.getPercentageBaseSizing();
    const configuration = this.configuration;

    context.strokeStyle = configuration.borderColor;
    context.lineWidth = configuration.borderWidth;

    context.beginPath();

    context.arc(this.center.x * pWidth, this.center.y * pHeight, this.radius * pWidth, 0, 2 * Math.PI);

    if (configuration.renderBackground) {
      context.fillStyle = configuration.backgroundColor;
      context.fill();
    }

    context.stroke();
  }

}
