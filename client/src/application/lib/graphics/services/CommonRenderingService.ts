import {AbstractCanvasGraphicsInteractiveObject} from "../graphics_objects";
import {AbstractEventEmittingRenderingService} from "./AbstractEventEmittingRenderingService";

export class CommonRenderingService extends AbstractEventEmittingRenderingService {

  /* Rendering: */

  protected renderItems(): void {

    for (const object of this.rendererObjects) {

      if (object.isEnabled()) {

        object.render(this.internalRendererContext);

        if (this.interactionEnabled && object.isInteractive() && (object as AbstractCanvasGraphicsInteractiveObject).isSelected()) {
          (object as AbstractCanvasGraphicsInteractiveObject).renderInteraction(this.internalRendererContext);
        }
      }
    }
  }

}
