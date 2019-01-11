import {
  AbstractCanvasGraphicsInteractiveObject,
  AbstractCanvasGraphicsMovableObject,
  AbstractCanvasGraphicsRenderObject,
  AbstractCanvasGraphicsResizableObject
} from "../graphics_objects";
import {AbstractRenderingService} from "./AbstractRenderingService";

import {IPoint} from "../types";

export abstract class AbstractInteractiveRenderingService extends AbstractRenderingService {

  protected mouseDown: boolean = false;
  protected lastMouseTouch: IPoint | null = null;
  protected selectedObject: AbstractCanvasGraphicsInteractiveObject<any> | null = null;
  protected resizing: boolean | null = null;

  // Mouse down.

  public isMouseDown(): boolean {
    return this.mouseDown;
  }

  public setMouseDown(mouseDown: boolean, point?: IPoint): void {
    this.mouseDown = mouseDown;

    if (point) {
      this.lastMouseTouch = point;
    } else {
      this.lastMouseTouch = null;
    }
  }

  // Resizing.

  public isResizing(): boolean {
    return Boolean(this.resizing);
  }

  public setResizing(resizing: boolean): void {
    this.resizing = resizing;
  }

  // Selected object.

  public setSelectedObject(object: AbstractCanvasGraphicsRenderObject<any> | null): void {

    if (this.selectedObject !== null) {
      this.selectedObject.setSelected(false);
    }

    if (object !== null && object.isInteractive()) {
      this.selectedObject = object as AbstractCanvasGraphicsInteractiveObject<any>;
      this.selectedObject.setSelected(true);
    } else {
      this.selectedObject = null;
    }
  }

  public getSelectedObject(): AbstractCanvasGraphicsInteractiveObject<any> | null {
    return this.selectedObject;
  }

  public handleMouseEnter(point: IPoint): void {
    if (this.interactionEnabled) {
      this.resizing = null;
      this.mouseDown = false;
    }
  }

  public handleMouseLeave(point: IPoint): void {
    if (this.interactionEnabled) {
      this.resizing = null;
      this.mouseDown = false;
    }
  }

  public handleMouseUp(point: IPoint): void {
    if (this.interactionEnabled) {
      this.resizing = null;
      this.mouseDown = false;
    }
  }

  public handleContextDown(point: IPoint): void {

    if (!this.interactionEnabled) {
      return;
    }

    for (let it: number = this.rendererObjects.length - 1; it >= 0; it --) {

      const renderObject = this.rendererObjects[it];

      if (renderObject.isVisible() && renderObject.isInteractive()) {

        const movableRenderObject: AbstractCanvasGraphicsMovableObject<any> = renderObject as AbstractCanvasGraphicsMovableObject<any>;

        if (movableRenderObject.isInBounds(point)) {
          return movableRenderObject.toggleEnabled();
        }
      }
    }
  }

  public handleMouseDown(point: IPoint): void {

    if (!this.interactionEnabled) {
      return;
    }

    this.setMouseDown(true, point);

    // Iterate backwards - layer display related.
    // Last objects are above first.

    for (let it: number = this.rendererObjects.length - 1; it >= 0; it --) {

      const renderObject = this.rendererObjects[it];

      if (renderObject.isVisible() && renderObject.isInteractive()) {

        const movableRenderObject: AbstractCanvasGraphicsMovableObject<any> = renderObject as AbstractCanvasGraphicsMovableObject<any>;

        if (movableRenderObject.isInBounds(point)) {
          return this.setSelectedObject(movableRenderObject);
        }
      }
    }

    // Nothing selected at all, clicked empty space.
    this.setSelectedObject(null);
  }

  public handleMouseMove(point: IPoint): void {

    if (!this.isInteractionEnabled || !this.mouseDown) {
      return;
    }

    const oldTouchPosition: IPoint = this.lastMouseTouch || point;
    const interactiveSelectedObject: AbstractCanvasGraphicsResizableObject<any> | null = (
      this.selectedObject !== null && this.selectedObject.isVisible() && this.selectedObject.isMovable()
      ? this.selectedObject as AbstractCanvasGraphicsResizableObject<any>
      : null
    );

    if (interactiveSelectedObject !== null) {

      if (this.resizing === null) {
        this.resizing = interactiveSelectedObject.isResizable() && interactiveSelectedObject.isInResizeBounds(point);
      }

      if (this.resizing === true) {
        interactiveSelectedObject.resize(point, oldTouchPosition);
      } else {
        interactiveSelectedObject.move(point, oldTouchPosition);
      }
    }

    this.lastMouseTouch = point;
  }

}
