import {ICanvasGraphicsSizingContext} from "../context/ICanvasGraphicsSizingContext";
import {CanvasGraphicsMovableObject} from "../graphics_objects";
import {CanvasGraphicsRenderObject} from "../graphics_objects/CanvasGraphicsRenderObject";

export class RenderingService {

  public shouldRender: boolean = false;
  public shouldHandleInteraction: boolean = false;

  private renderContext: CanvasRenderingContext2D = null as any;
  private renderObjects: Array<CanvasGraphicsRenderObject> = [];
  private renderSizing: ICanvasGraphicsSizingContext = { width: 160, height: 90, offsetX: 0, offsetY: 0 };

  private isMouseDown: boolean = false;
  private selectedObject: CanvasGraphicsMovableObject | null = null;

  public seMouseDown(isMouseDown: boolean): void {
    this.isMouseDown = isMouseDown;
  }

  public setSizing(sizing: ICanvasGraphicsSizingContext): void {
    this.renderSizing = sizing;
  }

  public setRenderContext(context: CanvasRenderingContext2D): void {
    this.renderContext = context;
  }

  public setRenderObjects(objects: Array<CanvasGraphicsRenderObject>): void {
    this.renderObjects = objects;
  }

  public render(): void {

    this.clear();
    this.renderItems();

    if (this.shouldRender) {
      window.requestAnimationFrame(() => this.render());
    }

  }

  /* Events */

  public handleMouseDown(event: MouseEvent): void {

    if (!this.shouldHandleInteraction) {
      return;
    }

    this.seMouseDown(true);

    // Remove selection.

    this.selectedObject = null;

    this.renderObjects.forEach((it) => {
      if (it.isMovable()) {
        (it as CanvasGraphicsMovableObject).setSelected(false);
      }
    });

    // Add selection.

    for (let it: number = this.renderObjects.length - 1; it >= 0; it --) {

      const renderObject = this.renderObjects[it];

      if (renderObject.isMovable()) {

        const movableRenderObject: CanvasGraphicsMovableObject = renderObject as CanvasGraphicsMovableObject;

        if (movableRenderObject.isInBounds(event.pageX - this.renderSizing.offsetX, event.pageY - this.renderSizing.offsetY)) {
          movableRenderObject.setSelected(true);
          this.selectedObject = movableRenderObject;
          break;
        }

      }

    }

  }

  public handleMouseUp(event: MouseEvent): void {

    if (!this.shouldHandleInteraction) {
      return;
    }

    this.seMouseDown(false);

  }

  public handleMouseMove(event: MouseEvent): void {

    if (!this.shouldHandleInteraction || !this.isMouseDown) {
      return;
    }

    if (this.selectedObject !== null) {
      this.selectedObject.move(event.pageX - this.renderSizing.offsetX, event.pageY - this.renderSizing.offsetY);
    }

  }

  public handleMouseEnter(event: MouseEvent): void {

    if (!this.shouldHandleInteraction) {
      return;
    }

    this.seMouseDown(false);

  }

  public handleMouseLeave(event: MouseEvent): void {

    if (!this.shouldHandleInteraction) {
      return;
    }

    this.seMouseDown(false);

  }

  /* Rendering implementation. */

  private clear(): void {
    this.renderContext.clearRect(0, 0, this.renderSizing.width, this.renderSizing.height);
  }

  private renderItems(): void {

    for (const object of this.renderObjects) {

      object.setContext(this.renderContext);
      object.setSizing(this.renderSizing);

      if (!object.isDisabled()) {
        object.renderSelf();
      }

    }

  }

}
