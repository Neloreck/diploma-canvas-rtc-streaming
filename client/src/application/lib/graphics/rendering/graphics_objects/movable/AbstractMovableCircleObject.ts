import {IPoint} from "../../context/IPoint";
import {CanvasGraphicsMovableCircleObject} from "../base/CanvasGraphicsMovableCircleObject";
import {ResizeControl} from "./ResizeControl";

export abstract class AbstractMovableCircleObject extends CanvasGraphicsMovableCircleObject {

  public radius: number = 25;
  public center: IPoint = { x: 50, y: 50 };
  protected resizeControlsSize: number = 10;

  private readonly resizeControl: ResizeControl = new ResizeControl(0, 0, 15, 15);

  public constructor();
  public constructor(radius?: number, center?: { x: number, y: number }) {

    super();

    this.radius = radius || 10;
    this.center = center || { x: 50, y: 50 };
  }

  public renderInteraction(): void {
    this.renderSelectionOverElement();
    this.renderResizeControls();
  }

  public isInResizeBounds(target: IPoint): boolean {

    const distance: number = Math.sqrt(Math.pow(target.x - this.getPercentageWidth(this.center.x), 2) + Math.pow(target.y - this.getPercentageHeight(this.center.y), 2));
    const isResizingOverBorder: boolean = (this.selected && Math.abs(this.getPercentageWidth(this.radius) - distance) < 4);

    return (isResizingOverBorder || this.resizeControl.isInBounds(target));
  }

  protected onResize(resizeTo: IPoint, resizeFrom: IPoint): void {

    const distance: number = Math.sqrt(Math.pow(resizeTo.x - this.getPercentageWidth(this.center.x), 2) + Math.pow(resizeTo.y - this.getPercentageHeight(this.center.y), 2));
    this.radius = this.asPercentageWidth(Math.max(this.resizeControlsSize + 2, distance));
  }

  protected getBoundsRadius(): number {
    return this.getPercentageWidth(this.radius);
  }

  protected setBoundsCenter(target: IPoint): void {
    this.center.x = target.x;
    this.center.y = target.y;
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
