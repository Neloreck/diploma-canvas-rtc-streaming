import {ICanvasGraphicsSizingContext} from "../../../context/ICanvasGraphicsSizingContext";
import {CanvasGraphicsGridLayoutRenderer} from "../../../graphics_objects/CanvasGraphicsGridLayoutRenderer";
import {ICanvasGraphicssOffsetContext} from "../../../context/ICanvasGraphicssOffsetContext";

export class CanvasGridRenderingService {

  public shouldRender: boolean = true;

  public sizing: ICanvasGraphicsSizingContext = { width: 160, height: 90 };
  public offset: ICanvasGraphicssOffsetContext = { offsetX: 0, offsetY: 0 };

  public context: CanvasRenderingContext2D = null as any;

  public reRender(): void {

    this.clear();

    if (this.shouldRender) {
      this.fillTemp();
    }

  }

  public onGridClick(event: MouseEvent): void {

    this.context.beginPath();
    this.context.fillStyle = "#ff3311";
    this.context.arc(event.pageX - this.offset.offsetX, event.pageY - this.offset.offsetY, 15, 0, Math.PI * 2);
    this.context.fill();
    this.context.closePath();

    this.fillTemp();
  }

  public onGridMouseLeave(event: any): void {
    this.reRender();
  }

  public onGridMouseMove(event: any): void {
    this.clear();

    this.context.beginPath();
    this.context.fillStyle = "#85d4ff";
    this.context.arc(event.pageX - this.offset.offsetX, event.pageY - this.offset.offsetY, 5, 0, Math.PI * 2);
    this.context.fill();
    this.context.closePath();

    this.fillTemp();
  }

  private clear(): void {
    this.context.clearRect(0, 0, this.sizing.width, this.sizing.height);

  }

  private fillTemp(): void {

    const t = new CanvasGraphicsGridLayoutRenderer();
    t.setSizing(this.sizing);
    t.setContext(this.context);
    t.renderSelf();

  }

}
