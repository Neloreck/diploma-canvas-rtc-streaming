import {CanvasGraphicsInteractiveObject, CanvasGraphicsMovableObject, CanvasGraphicsRenderObject} from "../graphics_objects";
import {AbstractRenderingService} from "./AbstractRenderingService";

import {IPoint} from "../context";

export abstract class AbstractInteractiveRenderingService extends AbstractRenderingService {

  protected mouseDown: boolean = false;
  protected lastMouseTouch: IPoint | null = null;
  protected selectedObject: CanvasGraphicsInteractiveObject | null = null;
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

  public setSelectedObject(object: CanvasGraphicsRenderObject | null): void {

    if (this.selectedObject !== null) {
      this.selectedObject.setSelected(false);
    }

    if (object !== null && object.isInteractive()) {
      this.selectedObject = object as CanvasGraphicsInteractiveObject;
      this.selectedObject.setSelected(true);
    } else {
      this.selectedObject = null;
    }
  }

  public getSelectedObject(): CanvasGraphicsInteractiveObject | null {
    return this.selectedObject;
  }

  public handleMouseEnter(point: IPoint): void {
    if (this.interactionEnabled) {
      this.resizing = false;
      this.mouseDown = false;
    }
  }

  public handleMouseLeave(point: IPoint): void {
    if (this.interactionEnabled) {
      this.resizing = false;
      this.mouseDown = false;
    }
  }

  public handleMouseUp(point: IPoint): void {
    if (this.interactionEnabled) {
      this.resizing = false;
      this.mouseDown = false;
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

      if (renderObject.isEnabled() && renderObject.isInteractive()) {

        const movableRenderObject: CanvasGraphicsMovableObject = renderObject as CanvasGraphicsMovableObject;

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
    const interactiveSelectedObject: CanvasGraphicsMovableObject | null = (
      this.selectedObject !== null && this.selectedObject.isEnabled() && this.selectedObject.isMovable()
      ? this.selectedObject as CanvasGraphicsMovableObject
      : null
    );

    if (interactiveSelectedObject !== null) {

      if (this.resizing === null) {
        this.setResizing(interactiveSelectedObject.isInResizeBounds(point));
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
