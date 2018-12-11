import {AbstractCanvasGraphicsRenderObject} from "../../base/AbstractCanvasGraphicsRenderObject";

export class DomCanvasShadowRO extends AbstractCanvasGraphicsRenderObject {

  public configuration = {};

  private readonly shadow: HTMLCanvasElement;

  public constructor(shadow: HTMLCanvasElement) {

    super();

    this.shadow = shadow;

  }

  public renderSelf(): void {
    this.getContext().drawImage(this.shadow, 0, 0);
  }

}
