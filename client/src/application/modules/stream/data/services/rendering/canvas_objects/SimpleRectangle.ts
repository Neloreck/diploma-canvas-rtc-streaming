import {AbstractBaseRectangleObject} from "@Lib/graphics";

export class SimpleRectangle extends AbstractBaseRectangleObject {

  public readonly configuration = {
    backgroundColor: "#e9e5e2",
    borderColor: "#24242b",
    borderWidth: 4,
    renderBackground: true
  };

  public renderSelf(): void {

    const context: CanvasRenderingContext2D = this.getContext();

    const configuration = this.configuration;

    context.strokeStyle = this.configuration.borderColor;
    context.lineWidth = this.configuration.borderWidth;

    context.beginPath();

    if (configuration.renderBackground) {
      context.fillStyle = configuration.backgroundColor;
      context.fillRect(this.percentsToAbsoluteWidth(this.rectSize.left), this.percentsToAbsoluteHeight(this.rectSize.top), this.percentsToAbsoluteWidth(this.rectSize.width), this.percentsToAbsoluteHeight(this.rectSize.height));
    }

    context.rect(this.percentsToAbsoluteWidth(this.rectSize.left), this.percentsToAbsoluteHeight(this.rectSize.top), this.percentsToAbsoluteWidth(this.rectSize.width), this.percentsToAbsoluteHeight(this.rectSize.height));
    context.stroke();
    context.closePath();
  }

}
