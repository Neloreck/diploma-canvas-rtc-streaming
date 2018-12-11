import {AbstractBaseCircleObject} from "@Lib/graphics";

export class SimpleCircle extends AbstractBaseCircleObject {

  public configuration = {
    backgroundColor: "#e5e7e9",
    borderColor: "#24242b",
    borderWidth: 4,
    renderBackground: true
  };

  public renderSelf(): void {

    const context: CanvasRenderingContext2D = this.getContext();
    const configuration = this.configuration;

    context.strokeStyle = configuration.borderColor;
    context.lineWidth = configuration.borderWidth;

    context.beginPath();

    context.arc(this.percentsToAbsoluteWidth(this.center.x ), this.percentsToAbsoluteHeight(this.center.y), this.percentsToAbsoluteWidth(this.radius), 0, 2 * Math.PI);

    if (configuration.renderBackground) {
      context.fillStyle = configuration.backgroundColor;
      context.fill();
    }

    context.stroke();
  }

}
