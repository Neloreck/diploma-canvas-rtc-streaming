import {IPoint} from "../../context/IPoint";
import {CanvasGraphicsMovableCircleObject} from "../base/CanvasGraphicsMovableCircleObject";
import {MovableResizeControlMRO} from "./MovableResizeControlMRO";

export abstract class AbstractMovableCircleObject extends CanvasGraphicsMovableCircleObject {

  protected radius: number = 150;
  protected center: IPoint = { x: 100, y: 100 };
  protected resizeControlsSize: number = 10;

  private readonly resizeControl: MovableResizeControlMRO = new MovableResizeControlMRO(0, 0, 15, 15);

  public constructor(radius: number, center: { x: number, y: number }) {

    super();

    this.radius = radius;
    this.center = center;
  }

  public abstract renderSelf(): void;

  public renderInteraction(): void {
    this.renderSelectionOverElement();
    this.renderResizeControls();
  }

  public isInResizeBounds(x: number, y: number): boolean {
    return this.resizeControl.isInBounds(x, y);
  }

  protected onResize(resizeTo: IPoint, resizeFrom: IPoint): void {

    const distance: number = Math.sqrt(Math.pow(resizeTo.x - this.getPercentageWidth(this.center.x), 2) + Math.pow(resizeTo.y - this.getPercentageHeight(this.center.y), 2));
    this.radius = this.asPercentageWidth(distance);
  }

  protected getBoundsRadius(): number {
    return this.getPercentageWidth(this.radius);
  }

  protected setBoundsCenter(x: number, y: number): void {
    this.center.x = x;
    this.center.y = y;
  }

  protected getBoundsCenter(): IPoint {
    return { x: this.getPercentageWidth(this.center.x), y: this.getPercentageHeight(this.center.y) };
  }

  private renderResizeControls(): void {

    const { width: pWidth, height: pHeight } = this.getPercentageBaseSizing();

    const resizeSize: number = this.resizeControlsSize;

    this.resizeControl.setContext(this.getContext());
    this.resizeControl.setSizing(this.getSizing());
    this.resizeControl.updateAbsoluteSizing((this.center.x) * pWidth - resizeSize / 2, (this.center.y * pHeight - this.radius * pWidth) , resizeSize, resizeSize);
    this.resizeControl.renderSelf();
  }

}
