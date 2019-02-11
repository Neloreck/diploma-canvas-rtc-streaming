import { ReactContextManager } from "@redux-cbd/context";
import { Bind } from "@redux-cbd/utils";
import { throttle } from "lodash";

// Lib.
import { Logger } from "@Lib/utils";

// Props.
export interface IRenderingContext {
  renderingState: {
    addDisabledObjects: boolean;
    propagateRendererEvents: boolean;
    showGraphics: boolean;
    showGrid: boolean;
    showPreview: boolean;
  };
  renderingActions: {
    setAdditionVisibility(param: boolean): void;
    setRendererEventsPropagation(param: boolean): void;
    setGridDisplay(param: boolean): void;
    setGraphicsDisplay(param: boolean): void;
    setPreviewDisplay(param: boolean): void;
  };
}

export class RenderingContextManager extends ReactContextManager<IRenderingContext> {

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

  private readonly log: Logger = new Logger("[🏭C-RND]", true);

  // Actions:

  @Bind()
  public setAdditionVisibility(addDisabledObjects: boolean): void {
    this.context.renderingState = { ...this.context.renderingState, addDisabledObjects };
    this.update();
  }

  @Bind()
  public setGridDisplay(showGrid: boolean): void {
    this.context.renderingState = { ...this.context.renderingState, showGrid };
    this.update();
  }

  @Bind()
  public setGraphicsDisplay(showGraphics: boolean): void {
    this.context.renderingState = { ...this.context.renderingState, showGraphics };
    this.update();
  }

  @Bind()
  public setPreviewDisplay(showPreview: boolean): void {
    this.context.renderingState = { ...this.context.renderingState, showPreview };
    this.update();
  }

  @Bind()
  public setRendererEventsPropagation(propagateRendererEvents: boolean): void {
    this.context.renderingState = { ...this.context.renderingState, propagateRendererEvents };
    this.update();
  }

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
