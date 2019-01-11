import {AbstractBaseRectangleObject} from "../AbstractBaseRectangleObject";

export class FixedControlButton extends AbstractBaseRectangleObject<never> {

  public static EButtonType = {
    DEFAULT: "DEFAULT",
    DELETE: "DELETE",
    ENLARGE: "ENLARGE",
    LOWER: "LOWER",
    MOVE_BOTTOM: "MOVE_BOTTOM",
    MOVE_LEFT: "MOVE_LEFT",
    MOVE_RIGHT: "MOVE_RIGHT",
    MOVE_TOP: "MOVE_TOP"
  };

  public configuration: never = null as never;

  public readonly buttonType: string;

  public root = { x: 0, y: 0};
  public size: number = 2;

  public constructor(buttonType: string) {
    super();

    this.buttonType = buttonType;
  }

  public renderSelf(context: CanvasRenderingContext2D): void {

    context.strokeStyle = "#000";
    context.lineWidth = 1;

    const {widthPercent: pWidth, heightPercent: pHeight} = this.getBasePercentSizing();

    const absHeight = this.size * pWidth;
    const absWidth = this.size * pWidth;

    const absX = this.root.x * pWidth;
    const absY =  this.root.y * pHeight;

    const absSegSize = absWidth / 5;
    const absSegPadding = absSegSize;

    switch (this.buttonType) {

      case FixedControlButton.EButtonType.ENLARGE:

        context.fillStyle = "#42b28d";
        context.beginPath();
        context.fillRect(absX, absY, absWidth, absHeight);
        context.strokeRect(absX, absY, absWidth, absHeight);
        context.fillStyle = "#eee";
        context.fillRect(absX + absWidth / 2 - absSegSize / 2, absY + absSegPadding, absSegSize, absHeight - absSegPadding * 2);
        context.fillRect(absX + absSegPadding, absY + absHeight / 2 - absSegSize / 2, absWidth - absSegPadding * 2, absSegSize);
        context.closePath();

        break;

      case FixedControlButton.EButtonType.DELETE:

        context.fillStyle = "#b25f50";

        context.beginPath();
        context.fillRect(absX, absY, absWidth, absHeight);
        context.strokeRect(absX, absY, absWidth, absHeight);

        context.lineWidth = absSegSize;

        context.moveTo(absX + absSegPadding, absY + absSegPadding);
        context.lineTo(absX + absWidth - absSegPadding, absY + absHeight - absSegPadding);
        context.stroke();

        context.moveTo(absX + absSegPadding, absY + absHeight - absSegPadding);
        context.lineTo(absX + absWidth - absSegPadding, absY + absSegPadding);
        context.stroke();

        context.closePath();

        break;

      case FixedControlButton.EButtonType.LOWER:

        context.fillStyle = "#a2b25b";

        context.beginPath();
        context.fillRect(absX, absY, absWidth, absHeight);
        context.strokeRect(absX, absY, absWidth, absHeight);
        context.fillStyle = "#eee";
        context.fillRect(absX + absSegPadding, absY + absHeight / 2 - absSegSize / 2, absWidth - absSegPadding * 2, absSegSize);
        context.closePath();

        break;

      default:

        context.fillStyle = "#42b28d";

        context.beginPath();
        context.fillRect(absX, absY, absWidth, absHeight);
        context.strokeRect(absX, absY, absWidth, absHeight);

        context.strokeStyle = "#eee";
        context.lineWidth = absSegPadding / 2;

        switch (this.buttonType) {

          case FixedControlButton.EButtonType.MOVE_LEFT:

            context.moveTo(absX + absSegSize / 2, absY + absHeight / 2);
            context.lineTo(absX + absWidth - absSegSize / 2, absY + absHeight / 2);
            context.stroke();

            context.moveTo(absX + absSegSize / 2, absY + absHeight / 2);
            context.lineTo(absX + absSegSize / 2 + absSegSize * 1.5, absY + absHeight / 2 - absSegSize * 1.5);
            context.stroke();

            context.moveTo(absX + absSegSize / 2, absY + absHeight / 2);
            context.lineTo(absX + absSegSize / 2 + absSegSize * 1.5, absY + absHeight / 2 + absSegSize * 1.5);
            context.stroke();

            break;

          case FixedControlButton.EButtonType.MOVE_BOTTOM:

            context.moveTo(absX + absWidth / 2, absY + absSegSize / 2);
            context.lineTo(absX + absWidth / 2, absY + absHeight - absSegSize / 2);
            context.stroke();

            context.moveTo(absX + absWidth / 2 - absSegSize * 1.5, absY + absHeight - absSegSize / 2 - absSegSize * 1.5);
            context.lineTo(absX + absWidth / 2, absY + absHeight - absSegSize / 2);
            context.stroke();

            context.moveTo(absX + absWidth / 2 + absSegSize * 1.5, absY + absHeight - absSegSize / 2 - absSegSize * 1.5);
            context.lineTo(absX + absWidth / 2, absY + absHeight - absSegSize / 2);
            context.stroke();

            break;

          case FixedControlButton.EButtonType.MOVE_TOP:

            context.moveTo(absX + absWidth / 2, absY + absSegSize / 2);
            context.lineTo(absX + absWidth / 2, absY + absHeight - absSegSize / 2);
            context.stroke();

            context.moveTo(absX + absWidth / 2 - absSegSize * 1.5, absY + absSegSize / 2 + absSegSize * 1.5);
            context.lineTo(absX + absWidth / 2, absY + absSegSize / 2);
            context.stroke();

            context.moveTo(absX + absWidth / 2 + absSegSize * 1.5, absY + absSegSize / 2 + absSegSize * 1.5);
            context.lineTo(absX + absWidth / 2, absY + absSegSize / 2);
            context.stroke();

            break;

          case FixedControlButton.EButtonType.MOVE_RIGHT:

            context.moveTo(absX + absSegSize / 2, absY + absHeight / 2);
            context.lineTo(absX + absWidth - absSegSize / 2, absY + absHeight / 2);
            context.stroke();

            context.moveTo(absX + absWidth - absSegSize / 2, absY + absHeight / 2);
            context.lineTo(absX + absWidth - absSegSize / 2 - absSegSize * 1.5, absY + absHeight / 2 - absSegSize * 1.5);
            context.stroke();

            context.moveTo(absX + absWidth - absSegSize / 2, absY + absHeight / 2);
            context.lineTo(absX + absWidth - absSegSize / 2 - absSegSize * 1.5, absY + absHeight / 2 + absSegSize * 1.5);
            context.stroke();

            break;

          default:
            break;
        }

        context.closePath();
    }

  }

}
