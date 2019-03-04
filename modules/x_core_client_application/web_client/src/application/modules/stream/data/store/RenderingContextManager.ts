import { Bind, ContextManager } from "dreamstate";
import { throttle } from "lodash";

// Lib.
import { Logger } from "@Lib/utils";

// Props.
export interface IRenderingContext {
  renderingActions: {
    setAdditionVisibility(param: boolean): void;
    setRendererEventsPropagation(param: boolean): void;
    setGridDisplay(param: boolean): void;
    setGraphicsDisplay(param: boolean): void;
    setPreviewDisplay(param: boolean): void;
  };
  renderingState: {
    addDisabledObjects: boolean;
    propagateRendererEvents: boolean;
    showGraphics: boolean;
    showGrid: boolean;
    showPreview: boolean;
  };
}

export class RenderingContextManager extends ContextManager<IRenderingContext> {

  private static SENSITIVE_ACTIONS_DELAY: number = 500;

  public context: IRenderingContext = {
    renderingActions: {
      setAdditionVisibility: throttle(this.setAdditionVisibility, RenderingContextManager.SENSITIVE_ACTIONS_DELAY),
      setGraphicsDisplay: throttle(this.setGraphicsDisplay, RenderingContextManager.SENSITIVE_ACTIONS_DELAY),
      setGridDisplay: throttle(this.setGridDisplay, RenderingContextManager.SENSITIVE_ACTIONS_DELAY),
      setPreviewDisplay: throttle(this.setPreviewDisplay, RenderingContextManager.SENSITIVE_ACTIONS_DELAY),
      setRendererEventsPropagation: throttle(this.setRendererEventsPropagation, RenderingContextManager.SENSITIVE_ACTIONS_DELAY),
    },
    renderingState: {
      addDisabledObjects: true,
      propagateRendererEvents: true,
      showGraphics: true,
      showGrid: false,
      showPreview: false
    }
  };

  private readonly setState = ContextManager.getSetter(this, "renderingState");
  private readonly log: Logger = new Logger("[🏭C-RND]", true);

  // Actions:

  @Bind()
  public setAdditionVisibility(addDisabledObjects: boolean): void {
    this.setState({ addDisabledObjects });
  }

  @Bind()
  public setGridDisplay(showGrid: boolean): void {
    this.setState({ showGrid });
  }

  @Bind()
  public setGraphicsDisplay(showGraphics: boolean): void {
    this.setState({ showGraphics });
  }

  @Bind()
  public setPreviewDisplay(showPreview: boolean): void {
    this.setState({ showPreview });
  }

  @Bind()
  public setRendererEventsPropagation(propagateRendererEvents: boolean): void {
    this.setState({ propagateRendererEvents });
  }

  // Lifecycle.

  @Bind()
  protected onProvisionEnded(): void {

    this.context.renderingState = {
      addDisabledObjects: true,
      propagateRendererEvents: true,
      showGraphics: true,
      showGrid: false,
      showPreview: false
    };

    this.log.info("Disposed rendering storage.");
  }

}
