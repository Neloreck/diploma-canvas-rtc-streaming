import {AbstractBaseRectangleObject} from "@Lib/graphics";

export interface ISimpleRectangleConfig {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  renderBackground: boolean;
}

export class SimpleRectangle extends AbstractBaseRectangleObject<ISimpleRectangleConfig> {

  public readonly config: ISimpleRectangleConfig = {
    backgroundColor: "#666",
    borderColor: "#000000",
    borderWidth: 3,
    renderBackground: true
  };

  public renderSelf(context: CanvasRenderingContext2D): void {

    const { widthPercent: pWidth, heightPercent: pHeight } = this.getBasePercentSizing();
    const configuration: ISimpleRectangleConfig = this.config;

    context.strokeStyle = this.config.borderColor;
    context.lineWidth = this.config.borderWidth;

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
