import {EObjectFixedPosition} from "../utils/EObjectFixedPosition";
import {AbstractBaseRectangleObject} from "./AbstractBaseRectangleObject";
import {FixedControlButton} from "./assist/FixedControlButton";

import {ICanvasGraphicsSizingContext} from "@Lib/graphics";

export abstract class AbstractBaseFixedPositionRectangleObject<T> extends AbstractBaseRectangleObject<T> {

  // Default position.
  protected position = EObjectFixedPosition.SM_TOP_LEFT;

  protected movers = {
    moveBottomButton: new FixedControlButton(FixedControlButton.EButtonType.MOVE_BOTTOM),
    moveLeftButton: new FixedControlButton(FixedControlButton.EButtonType.MOVE_LEFT),
    moveRightButton: new FixedControlButton(FixedControlButton.EButtonType.MOVE_RIGHT),
    moveTopButton: new FixedControlButton(FixedControlButton.EButtonType.MOVE_TOP)
  };

  protected enlargeButton: FixedControlButton = new FixedControlButton(FixedControlButton.EButtonType.ENLARGE);
  protected lowerButton: FixedControlButton = new FixedControlButton(FixedControlButton.EButtonType.LOWER);
  protected deleteButton: FixedControlButton = new FixedControlButton(FixedControlButton.EButtonType.DELETE);

  public constructor() {

    super();

    const halfButtonSize: number = this.enlargeButton.size / 2;

    this.movers.moveTopButton.root = {
      x: this.position.width / 2 + this.position.left - halfButtonSize,
      y: this.position.top
    };

    this.movers.moveLeftButton.root = {
      x: this.position.left,
      y: this.position.top + this.position.height / 2 - halfButtonSize * 2
    };

    this.movers.moveRightButton.root = {
      x: this.position.width + this.position.left - halfButtonSize * 2,
      y: this.position.top + this.position.height / 2 - halfButtonSize * 2
    };

    this.movers.moveBottomButton.root = {
      x: this.position.width / 2 + this.position.left - halfButtonSize,
      y: this.position.top + this.position.height - halfButtonSize * 3.5
    };

    this.lowerButton.root = {
      x: this.position.width - 7,
      y: this.position.top + 1
    };

    this.enlargeButton.root = {
      x: this.position.width - 4,
      y: this.position.top + 1
    };

    this.deleteButton.root = {
      x: this.position.width - 1,
      y: this.position.top + 1
    };
  }

  public setSizing(sizing: ICanvasGraphicsSizingContext): void {

    super.setSizing(sizing);

    this.movers.moveTopButton.setSizing(sizing);
    this.movers.moveBottomButton.setSizing(sizing);
    this.movers.moveLeftButton.setSizing(sizing);
    this.movers.moveRightButton.setSizing(sizing);

    this.enlargeButton.setSizing(sizing);
    this.lowerButton.setSizing(sizing);
    this.deleteButton.setSizing(sizing);
  }

  public isMovable(): boolean {
    return false;
  }

  public onMove(): void {
    /* Nothing to do. */
  }

  public renderResizeControls(context: CanvasRenderingContext2D): void {
    this.movers.moveTopButton.renderSelf(context);
    this.movers.moveBottomButton.renderSelf(context);
    this.movers.moveLeftButton.renderSelf(context);
    this.movers.moveRightButton.renderSelf(context);
    this.movers.moveRightButton.renderSelf(context);

    this.enlargeButton.renderSelf(context);
    this.lowerButton.renderSelf(context);
    this.deleteButton.renderSelf(context);
  }

}
