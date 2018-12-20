import {AbstractBaseRectangleObject} from "@Lib/graphics";

export class SimpleRectangle extends AbstractBaseRectangleObject {

  public readonly configuration = {
    backgroundColor: "#666",
    borderColor: "#000000",
    borderWidth: 3,
    renderBackground: true
  };

  public renderSelf(context: CanvasRenderingContext2D): void {

    const { widthPercent: pWidth, heightPercent: pHeight } = this.getBasePercentSizing();
    const configuration = this.configuration;

    context.strokeStyle = this.configuration.borderColor;
    context.lineWidth = this.configuration.borderWidth;

    context.beginPath();

    if (configuration.renderBackground) {
      context.fillStyle = configuration.backgroundColor;
      context.fillRect(pWidth * this.position.left, pHeight * this.position.top, pWidth * this.position.width, pHeight * this.position.height);
    }

    context.rect(pWidth * this.position.left, pHeight * this.position.top, pWidth * this.position.width, pHeight * this.position.height);
    context.stroke();
    context.closePath();
  }

}
