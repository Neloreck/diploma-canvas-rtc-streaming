import {AbstractBaseFixedPositionRectangleObject, IPoint} from "../../graphics";
import {AbstractCanvasGraphicsRenderObject} from "../graphics_objects";
import {AbstractInteractiveRenderingService} from "./AbstractInteractiveRenderingService";
import {ERenderingServiceEvent} from "./ERenderingServiceEvent";

export type TRenderingServiceEventHandler = (object: AbstractCanvasGraphicsRenderObject<any> | null) => void;

export abstract class AbstractEventEmittingRenderingService extends AbstractInteractiveRenderingService {

  private handlers: { [index: string]: Array<TRenderingServiceEventHandler>} = {};

  /* Events middleware. */

  public setSelectedObject(object: AbstractCanvasGraphicsRenderObject<any> | null): void {

    if (this.getSelectedObject() !== object) {
      super.setSelectedObject(object);
      this.dispatch(ERenderingServiceEvent.OBJECT_SELECTED, this.selectedObject);
    }
  }

  public handleMouseDown(targetPoint: IPoint): void {

    if (!this.interactionEnabled) {
      return;
    }

    if (this.selectedObject) {

      if (this.selectedObject.isInDeleteBounds(targetPoint)) {
        return this.dispatch(ERenderingServiceEvent.OBJECT_REMOVE, this.selectedObject);
      }

      if (this.selectedObject.hasFixedSizing()) {

        const selectedObject: AbstractBaseFixedPositionRectangleObject<any> = this.selectedObject as AbstractBaseFixedPositionRectangleObject<any>;

        // Scale change:
        if (selectedObject.isInLowerBounds(targetPoint)) {
          return selectedObject.lowerSize();
        } else if (selectedObject.isInEnlargeBounds(targetPoint)) {
          return selectedObject.enlargeSize();
        // Position change:
        }
      }

      if (this.selectedObject.isInDeleteBounds(targetPoint)) {
        return this.dispatch(ERenderingServiceEvent.OBJECT_REMOVE, this.selectedObject);
      }
    }

    super.handleMouseDown(targetPoint);
  }

  /* External events handling. */

  public addEventListener(event: ERenderingServiceEvent, handler: TRenderingServiceEventHandler): void {

    this.tryReserveHandlersMemory(event);
    if (!this.handlers[event].includes(handler)) {
      this.handlers[event].push(handler);
    }
  }

  public removeEventListener(event: ERenderingServiceEvent, handler: TRenderingServiceEventHandler): void {

    this.tryReserveHandlersMemory(event);
    this.handlers[event] = this.handlers[event].filter((cb: TRenderingServiceEventHandler) => cb !== handler);
  }

  protected dispatch(event: ERenderingServiceEvent, object: AbstractCanvasGraphicsRenderObject<any> | null): void {

    if (this.handlers[event]) {
      this.handlers[event].forEach((handler: TRenderingServiceEventHandler): void => handler(object));
    }
  }

  private tryReserveHandlersMemory(event: ERenderingServiceEvent): void {

    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }
  }

}
