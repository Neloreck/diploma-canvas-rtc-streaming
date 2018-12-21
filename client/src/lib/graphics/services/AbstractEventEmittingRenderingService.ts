import {AbstractCanvasGraphicsRenderObject} from "../graphics_objects";
import {AbstractInteractiveRenderingService} from "./AbstractInteractiveRenderingService";
import {ERenderingServiceEvent} from "./ERenderingServiceEvent";

export type TRenderingServiceEventHandler = (object: AbstractCanvasGraphicsRenderObject<any> | null) => void;

export abstract class AbstractEventEmittingRenderingService extends AbstractInteractiveRenderingService {

  private handlers: { [index: string]: Array<TRenderingServiceEventHandler>} = {};

  /* Events middleware. */

  public setSelectedObject(object: AbstractCanvasGraphicsRenderObject<any> | null): void {
    super.setSelectedObject(object);
    this.dispatch(ERenderingServiceEvent.OBJECT_SELECTED, this.selectedObject);
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
