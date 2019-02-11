import { IAbstractSizing, ICanvasGraphicsSizingContext, IPoint, ISerializedGraphicsObject } from "../../types";
import {
  BASE_GRID_LEVELS,
  EObjectFixedSize,
  fixedObjectsGrid,
} from "../utils/fixedObjectPosition";
import { AbstractBaseRectangleObject } from "./AbstractBaseRectangleObject";
import { FixedControlButton } from "./assist/FixedControlButton";

export interface IAbstractBaseFixedPositionRectangleObjectConfig {
  root: IPoint;
  size: EObjectFixedSize;
}

export abstract class AbstractBaseFixedPositionRectangleObject
  <T extends IAbstractBaseFixedPositionRectangleObjectConfig> extends AbstractBaseRectangleObject<T> {

  protected movers: {
    moveBottomButton: FixedControlButton,
    moveLeftButton: FixedControlButton,
    moveRightButton: FixedControlButton,
    moveTopButton: FixedControlButton
  } = {
    moveBottomButton: new FixedControlButton(FixedControlButton.EButtonType.MOVE_BOTTOM),
    moveLeftButton: new FixedControlButton(FixedControlButton.EButtonType.MOVE_LEFT),
    moveRightButton: new FixedControlButton(FixedControlButton.EButtonType.MOVE_RIGHT),
    moveTopButton: new FixedControlButton(FixedControlButton.EButtonType.MOVE_TOP)
  };

  protected enlargeButton: FixedControlButton = new FixedControlButton(FixedControlButton.EButtonType.ENLARGE);
  protected lowerButton: FixedControlButton = new FixedControlButton(FixedControlButton.EButtonType.LOWER);
  protected deleteButton: FixedControlButton = new FixedControlButton(FixedControlButton.EButtonType.DELETE);

  protected abstract sizingPresets: Array<IAbstractSizing>;

  public constructor(root: IPoint, sizing: IAbstractSizing) {

    super();

    this.position.height = sizing.height;
    this.position.width = sizing.width;
    this.position.left = root.x;
    this.position.top = root.y;
  }

  public isInBounds(targetPoint: IPoint): boolean {

    if (this.selected) {

      if (this.movers.moveRightButton.isInBounds(targetPoint) && this.config.root.x + 1 < BASE_GRID_LEVELS) {
        this.moveRight();
        return true;
      }

      if (this.movers.moveLeftButton.isInBounds(targetPoint) && this.config.root.x > 0) {
        this.moveLeft();
        return true;
      }

      if (this.movers.moveTopButton.isInBounds(targetPoint) && this.config.root.y > 0) {
        this.moveTop();
        return true;
      }

      if (this.movers.moveBottomButton.isInBounds(targetPoint) && this.config.root.y + 1 < BASE_GRID_LEVELS) {
        this.moveBot();
        return true;
      }
    }

    return super.isInBounds(targetPoint);
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

  public isInEnlargeBounds(checkPoint: IPoint): boolean {
    return this.enlargeButton.isInBounds(checkPoint);
  }

  public isInLowerBounds(checkPoint: IPoint): boolean {
    return this.lowerButton.isInBounds(checkPoint);
  }

  public isInDeleteBounds(checkPoint: IPoint): boolean {
    return this.deleteButton.isInBounds(checkPoint);
  }

  public hasFixedSizing(): boolean {
    return true;
  }

  public isMovable(): boolean {
    return false;
  }

  public onMove(): void {
    /* Nothing to do. */
  }

  // Sizing:

  public lowerSize(): void {

    const sizing: { width: number, height: number } = this.sizingPresets[--this.config.size];
    this.position = { ...this.position, ...sizing };

    this.updateControlsPositions();
  }

  public enlargeSize(): void {

    const sizing: { width: number, height: number } = this.sizingPresets[++this.config.size];
    this.position = { ...this.position, ...sizing };
    this.updateControlsPositions();
  }

  public moveTop(): void {

    const root: IPoint = this.config.root;
    const position: IPoint = fixedObjectsGrid[root.x][--root.y];

    this.position.left = position.x;
    this.position.top = position.y;

    this.updateControlsPositions();
  }

  public moveBot(): void {

    const root: IPoint = this.config.root;
    const position: IPoint = fixedObjectsGrid[root.x][++root.y];

    this.position.left = position.x;
    this.position.top = position.y;

    this.updateControlsPositions();
  }

  public moveLeft(): void {

    const root: IPoint = this.config.root;
    const position: IPoint = fixedObjectsGrid[--root.x][root.y];

    this.position.left = position.x;
    this.position.top = position.y;

    this.updateControlsPositions();
  }

  public moveRight(): void {

    const root: IPoint = this.config.root;
    const position: IPoint = fixedObjectsGrid[++root.x][root.y];

    this.position.left = position.x;
    this.position.top = position.y;

    this.updateControlsPositions();
  }

  public applySerialized(serialized: ISerializedGraphicsObject): void {

    super.applySerialized(serialized);

    const fixedSize: IAbstractSizing = this.sizingPresets[this.config.size];
    const fixedPosition: IPoint = fixedObjectsGrid[this.config.root.x][this.config.root.y];

    this.position.left = fixedPosition.x;
    this.position.top = fixedPosition.y;
    this.position.width = fixedSize.width;
    this.position.height = fixedSize.height;
  }

  // Rendering.

  protected renderControls(context: CanvasRenderingContext2D): void {

    if (this.config.root.y > 0) {
      this.movers.moveTopButton.renderSelf(context);
    }

    if (this.config.root.x > 0) {
      this.movers.moveLeftButton.renderSelf(context);
    }

    if (this.config.root.y + 1 < BASE_GRID_LEVELS) {
      this.movers.moveBottomButton.renderSelf(context);
    }

    if (this.config.root.x + 1 < BASE_GRID_LEVELS) {
      this.movers.moveRightButton.renderSelf(context);
    }

    if (this.config.size > 0) {
      this.lowerButton.renderSelf(context);
    }

    if (this.config.size < this.sizingPresets.length - 1) {
      this.enlargeButton.renderSelf(context);
    }

    this.deleteButton.renderSelf(context);
  }

  protected updateControlsPositions(): void {

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
      x: this.position.left + this.position.width - this.deleteButton.size - 7,
      y: this.position.top + 1
    };

    this.enlargeButton.root = {
      x: this.position.left + this.position.width - this.deleteButton.size - 4,
      y: this.position.top + 1
    };

    this.deleteButton.root = {
      x: this.position.left + this.position.width - this.deleteButton.size - 1,
      y: this.position.top + 1
    };
  }

}
