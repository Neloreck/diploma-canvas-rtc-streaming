import {MouseEvent} from "react";

import {Bind} from "@redux-cbd/utils";

import {ICanvasGraphicsSizingContext} from "../context/ICanvasGraphicsSizingContext";
import {CanvasGraphicsRenderObject} from "../graphics_objects/base/CanvasGraphicsRenderObject";
import {AbstractRenderingService} from "./AbstractRenderingService";

import {CanvasGraphicsInteractiveObject, CanvasGraphicsMovableObject} from "../graphics_objects";

import {IPoint} from "../context";

export class RenderingService extends AbstractRenderingService {

  public shouldRender: boolean = false;
  public shouldHandleInteraction: boolean = false;
  public shouldCleanupConext: boolean = true;

  private renderContext: CanvasRenderingContext2D = null as any;
  private renderObjects: Array<CanvasGraphicsRenderObject> = [];
  private renderSizing: ICanvasGraphicsSizingContext = { width: 160, height: 90, offsetX: 0, offsetY: 0 };

  private isMouseDown: boolean = false;
  private isResizing: boolean | null = null;
  private mouseTouchCoordinates: IPoint | null = { x: 0, y: 0 };
  private selectedObject: CanvasGraphicsMovableObject | null = null;

  /* Setters: */

  public setMouseDown(isMouseDown: boolean, mouseTouch: IPoint | null = null): void {
    this.isMouseDown = isMouseDown;
    this.mouseTouchCoordinates = mouseTouch;
  }

  public setMouseTouch(mouseTouch: IPoint): void {
    this.mouseTouchCoordinates = mouseTouch;
  }

  public setSizing(sizing: ICanvasGraphicsSizingContext): void {
    this.renderSizing = sizing;
  }

  public setResizing(isResizing: boolean | null): void {
    this.isResizing = isResizing;
  }

  public setRenderContext(context: CanvasRenderingContext2D): void {
    this.renderContext = context;
  }

  public setRenderObjects(objects: Array<CanvasGraphicsRenderObject>): void {
    this.renderObjects = objects;
  }

  public enableRendering(): void {
    this.shouldRender = true;
  }

  public disableRendering(): void {
    this.shouldRender = false;
  }

  public enableInteraction(): void {
    this.shouldHandleInteraction = true;
  }

  public disableInteraction(): void {
    this.shouldHandleInteraction = false;
  }

  public disableContextCleanup(): void {
    this.shouldCleanupConext = false;
  }

  /* Events: */

  public handleMouseDown(event: MouseEvent): void {

    if (!this.shouldHandleInteraction) {
      return;
    }

    this.setMouseDown(true, { x: event.pageX - this.renderSizing.offsetX, y: event.pageY - this.renderSizing.offsetY });

    // Remove selection.

    this.selectedObject = null;

    this.renderObjects.forEach((it) => {
      if (it.isInteractive()) {
        (it as CanvasGraphicsMovableObject).setSelected(false);
      }
    });

    // Add selection.

    for (let it: number = this.renderObjects.length - 1; it >= 0; it --) {

      const renderObject = this.renderObjects[it];

      if (renderObject.isMovable()) {

        const movableRenderObject: CanvasGraphicsMovableObject = renderObject as CanvasGraphicsMovableObject;

        if (movableRenderObject.isInBounds({ x: event.pageX - this.renderSizing.offsetX, y: event.pageY - this.renderSizing.offsetY })) {
          movableRenderObject.setSelected(true);
          this.selectedObject = movableRenderObject;
          break;
        }
      }
    }
  }

  public handleMouseUp(event: MouseEvent): void {

    if (this.shouldHandleInteraction) {
      this.setResizing(null);
      this.setMouseDown(false);
    }
  }

  public handleMouseMove(event: MouseEvent): void {

    if (this.shouldHandleInteraction && this.isMouseDown) {

      const realPosition: IPoint = { x: event.pageX - this.renderSizing.offsetX, y: event.pageY - this.renderSizing.offsetY };
      const oldPosition: IPoint = this.mouseTouchCoordinates || realPosition;

      if (this.selectedObject !== null) {

        const isInResizeBounds: boolean = this.selectedObject.isInResizeBounds(realPosition);

        if (this.isResizing === null) {
          this.setResizing(isInResizeBounds);
        }

        if (this.isResizing === true) {
          this.selectedObject.resize(realPosition, oldPosition);
        } else {
          this.selectedObject.move(realPosition, oldPosition);
        }

        this.setMouseTouch(realPosition);
      }
    }
  }

  public handleMouseEnter(event: MouseEvent): void {

    if (this.shouldHandleInteraction) {
      this.setResizing(null);
      this.setMouseDown(false);
    }
  }

  public handleMouseLeave(event: MouseEvent): void {

    if (this.shouldHandleInteraction) {
      this.setResizing(null);
      this.setMouseDown(false);
    }
  }

  /* Rendering: */

  @Bind()
  public render(): void {

    if (this.shouldCleanupConext) {
      this.clear();
    }

    if (this.shouldRender) {
      this.renderItems();
      window.requestAnimationFrame(this.render);
    }
  }

  public clear(): void {
    this.renderContext.clearRect(0, 0, this.renderSizing.width, this.renderSizing.height);
  }

  private renderItems(): void {

    for (const object of this.renderObjects) {

      object.setContext(this.renderContext);
      object.setSizing(this.renderSizing);

      if (!object.isDisabled()) {

        object.renderSelf();

        if (this.shouldHandleInteraction &&
          object.isInteractive() && (object as CanvasGraphicsInteractiveObject).isSelected()) {
          (object as CanvasGraphicsInteractiveObject).renderInteraction();
        }
      }
    }
  }

}
