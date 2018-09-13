import {ICanvasGraphicsSizingContext} from "./ICanvasGraphicsSizingContext";
import {CanvasGraphicsRenderObject} from "../graphics_objects/CanvasGraphicsRenderObject";

export class CanvasRenderingService {

  public shouldRender: boolean = false;

  public renderObjects: Array<CanvasGraphicsRenderObject> = [];

  public sizing: ICanvasGraphicsSizingContext = { width: 160, height: 90 };
  public context: CanvasRenderingContext2D = null as any;

  public render(): void {

    this.renderItems();

    if (this.shouldRender) {
      window.requestAnimationFrame(() => this.render());
    }

  }

  private renderItems(): void {

    this.context.clearRect(0, 0, this.sizing.width, this.sizing.height);

    for (const object of this.renderObjects) {
      object.setContext(this.context);
      object.setSizing(this.sizing);
      object.renderSelf();
    }

  }

}
