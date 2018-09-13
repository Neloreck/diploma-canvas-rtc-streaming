import {ICanvasGraphicsSizingContext} from "@Lib/canvas_video_graphics/graphics_objects/ICanvasGraphicsSizingContext";

export abstract class CanvasGraphicsRenderObject {

  private context: CanvasRenderingContext2D = null as any;
  private sizing: ICanvasGraphicsSizingContext = null as any;

  public setContext(context: CanvasRenderingContext2D): void {
    this.context = context;
  }

  public setSizing(sizing: ICanvasGraphicsSizingContext) {
    this.sizing = sizing;
  }

  public abstract renderSelf(): void;

  protected getPercentagedWidth(percents: number) {
    return this.sizing.width * percents / 100;
  }

  protected getPercentagedHeight(percents: number) {
    return this.sizing.height * percents / 100;
  }

  protected getContext(): CanvasRenderingContext2D {
    return this.context;
  }

  protected getSizing(): ICanvasGraphicsSizingContext {
    return this.sizing;
  }

}
