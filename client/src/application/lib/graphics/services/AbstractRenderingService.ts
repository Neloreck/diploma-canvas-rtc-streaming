import {Bind} from "@redux-cbd/utils";

import {AbstractCanvasGraphicsRenderObject} from "../graphics_objects";
import {ICanvasGraphicsSizingContext} from "../types";

export abstract class AbstractRenderingService {

  protected sizingContext: ICanvasGraphicsSizingContext = { height: 720, width: 1280 };
  protected renderingEnabled: boolean = true;
  protected interactionEnabled: boolean = true;
  protected cleanupContext: boolean = true;

  protected rendererObjects: Array<AbstractCanvasGraphicsRenderObject> = [];
  protected internalWebGLRenderer: HTMLCanvasElement = document.createElement("canvas");
  protected internalRendererContext: CanvasRenderingContext2D = this.internalWebGLRenderer.getContext("2d") as CanvasRenderingContext2D;

  public constructor(sizing?: ICanvasGraphicsSizingContext) {
    this.setSizing(sizing || this.sizingContext);
  }

  // *** Get stream. ***
  // todo: Other options.
  public getMediaStream(frameRate: number): MediaStream {
    // @ts-ignore because is still experimental:
    return this.internalWebGLRenderer.captureStream(frameRate);
  }

  // Context.

  public getRendererContext(): CanvasRenderingContext2D {
    return this.internalWebGLRenderer.getContext("2d") as CanvasRenderingContext2D;
  }

  // Renderer objects.

  public setRenderObjects(rendererObjects: Array<AbstractCanvasGraphicsRenderObject>): void {
    this.rendererObjects = rendererObjects;
    this.rendererObjects.forEach((object: AbstractCanvasGraphicsRenderObject) => object.setSizing(this.sizingContext));
  }

  public getRenderObjects(): Array<AbstractCanvasGraphicsRenderObject> {
    return this.rendererObjects;
  }

  // Interaction enabled.

  public isContextCleanupEnabled(): boolean {
    return this.cleanupContext;
  }

  public enableContextCleanup(): void {
    this.cleanupContext = true;
  }

  public disableContextCleanup(): void {
    this.cleanupContext = false;
  }

  // Interaction enabled.

  public isInteractionEnabled(): boolean {
    return this.interactionEnabled;
  }

  public enableInteraction(): void {
    this.interactionEnabled = true;
  }

  public disableInteraction(): void {
    this.interactionEnabled = false;
  }

  // Rendering enabled.

  public isRenderingEnabled(): boolean {
    return this.renderingEnabled;
  }

  public enableRendering(): void {
    this.renderingEnabled = true;
  }

  public disableRendering(): void {
    this.renderingEnabled = false;
  }

  // Sizing context.

  public setSizing(sizingContext: ICanvasGraphicsSizingContext): void {
    this.sizingContext = sizingContext;
    this.internalWebGLRenderer.width = sizingContext.width;
    this.internalWebGLRenderer.height = sizingContext.height;
    this.rendererObjects.forEach((object: AbstractCanvasGraphicsRenderObject): void => object.setSizing(sizingContext));
  }

  public getSizing(): ICanvasGraphicsSizingContext {
    return this.sizingContext;
  }

  /* Rendering: */

  @Bind()
  public render(): void {

    if (this.isContextCleanupEnabled()) {
      this.clear();
    }

    if (this.isRenderingEnabled()) {
      this.renderItems();
      window.requestAnimationFrame(this.render);
    }
  }

  public clear(): void {
    this.internalRendererContext.clearRect(0, 0, this.sizingContext.width, this.sizingContext.height);
  }

  protected abstract renderItems(): void;

}
