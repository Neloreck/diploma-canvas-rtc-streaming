import {AbstractRenderingService} from "./AbstractRenderingService";
import {ERenderingServiceEvent} from "./ERenderingServiceEvent";

import {CanvasGraphicsRenderObject} from "@Lib/graphics";

export type TRenderingServiceEventHandler = (object: CanvasGraphicsRenderObject | null) => void;

export abstract class AbstractInteractiveRenderingService extends AbstractRenderingService {

  private handlers: { [index: string]: Array<TRenderingServiceEventHandler>} = {};

  /* External events. */

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

  protected dispatch(event: ERenderingServiceEvent, object: CanvasGraphicsRenderObject | null): void {
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
