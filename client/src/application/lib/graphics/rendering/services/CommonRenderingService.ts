import {CanvasGraphicsInteractiveObject} from "../graphics_objects";
import {AbstractEventEmittingRenderingService} from "./AbstractEventEmittingRenderingService";

export class CommonRenderingService extends AbstractEventEmittingRenderingService {

  /* Rendering: */

  protected renderItems(): void {

    for (const object of this.rendererObjects) {

      // Todo: Lazy changes.
      object.setContext(this.internalRendererContext);
      object.setSizing(this.sizingContext);

      if (object.isEnabled()) {

        object.render();

        if (this.interactionEnabled &&
          object.isInteractive() && (object as CanvasGraphicsInteractiveObject).isSelected()) {

          (object as CanvasGraphicsInteractiveObject).renderInteraction();
        }
      }
    }
  }

}
