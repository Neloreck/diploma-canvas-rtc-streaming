import {CanvasGraphicsRenderObject} from "../../CanvasGraphicsRenderObject";

export class DomCanvasShadowRO extends CanvasGraphicsRenderObject {

  private readonly shadow: HTMLCanvasElement;

  public constructor(shadow: HTMLCanvasElement) {

    super();

    this.shadow = shadow;

  }

  public renderSelf(): void {
    this.getContext().drawImage(this.shadow, 0, 0);
  }

}
