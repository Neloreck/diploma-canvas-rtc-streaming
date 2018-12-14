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

    const textSize: number = this.percentsToAbsoluteWidth(this.textSize);
    const textAlignSub: number = textSize * this.text.length / 4.5;

    context.strokeStyle = "#FF0000";
    context.fillStyle = "#FFF";
    context.font = `${textSize}px Comic Sans MS`;
    context.textBaseline = "middle";
    // context.textAlign = "center";

    context.fillText(this.text, Math.floor(this.percentsToAbsoluteWidth(50) - textAlignSub), Math.floor(this.percentsToAbsoluteHeight(50)));
  }

}
