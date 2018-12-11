import {AbstractBaseRectangleObject} from "../../base/AbstractBaseRectangleObject";

export class CenteredTextRO extends AbstractBaseRectangleObject {

  public configuration = {};

  private increment: number = 0;

  private readonly text: string = "textLabel";
  private readonly textSize: number = 24;
  private readonly textColor: string = "#000";

  public constructor(text: string, textSize: number, textColor: string = "#000") {

    super();

    this.text = text;
    this.textSize = textSize;
    this.textColor = textColor;

  }

  public renderSelf(): void {
    this.renderTextLabel();
  }

  private renderTextLabel(): void {

    const context: CanvasRenderingContext2D = this.getContext();

    let text = this.text;

    const textSize: number = this.percentsToAbsoluteWidth(this.rectSize.width) * this.textSize;
    const textAlignSub: number = textSize * text.length / 4;

    context.strokeStyle = "#FF0000";
    context.fillStyle = "#FFF";
    context.font = `${textSize}px Comic Sans MS`;
    context.textBaseline = "middle";
    // context.textAlign = "center";

    if (this.increment > 40 && this.increment < 80) {
      text += ".";
    } else if (this.increment >= 80) {
      text += "..";
    }

    this.increment++;
    this.increment = this.increment % 120;

    context.fillText(text, Math.floor(this.absoluteToPercentsWidth(50) - textAlignSub), Math.floor(this.absoluteToPercentsHeight(50)));

  }

}
