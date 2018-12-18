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
      context.fillRect(pWidth * this.rectSize.left, pHeight * this.rectSize.top, pWidth * this.rectSize.width, pHeight * this.rectSize.height);
    }

    context.rect(pWidth * this.rectSize.left, pHeight * this.rectSize.top, pWidth * this.rectSize.width, pHeight * this.rectSize.height);
    context.stroke();
    context.closePath();
  }

}
