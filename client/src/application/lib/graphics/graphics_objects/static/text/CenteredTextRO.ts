import {ICanvasGraphicsSizingContext} from "../../../types";
import {AbstractBaseRectangleObject} from "../../base/AbstractBaseRectangleObject";

export class CenteredTextRO extends AbstractBaseRectangleObject {

  public configuration: never;

  private readonly text: string = "textLabel";
  private readonly textSize: number = 24;
  private readonly textColor: string = "#000";

  public constructor(text: string, textSize: number, textColor: string = "#000") {

    super();

    this.text = text;
    this.textSize = textSize;
    this.textColor = textColor;
  }

  public renderSelf(context: CanvasRenderingContext2D): void {

    const sizing: ICanvasGraphicsSizingContext = this.getSizing();

    const textSize: number = this.percentsToAbsoluteWidth(this.textSize);
    const textAlignSub: number = textSize * this.text.length / 4.5;

    context.fillStyle = "#000";
    context.font = `${textSize}px Comic Sans MS`;
    context.textBaseline = "middle";
    // context.textAlign = "center";

    context.fillText(this.text, Math.floor(this.percentsToAbsoluteWidth(50) - textAlignSub), Math.floor(this.percentsToAbsoluteHeight(50)));
  }

  public isInteractive(): boolean {
    return false;
  }

}
