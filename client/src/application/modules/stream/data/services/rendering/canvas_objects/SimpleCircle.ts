import {AbstractBaseCircleObject} from "@Lib/graphics";

export class SimpleCircle extends AbstractBaseCircleObject {

  public configuration = {
    backgroundColor: "#666",
    borderColor: "#000000",
    borderWidth: 3,
    renderBackground: true
  };

  public renderSelf(context: CanvasRenderingContext2D): void {

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
