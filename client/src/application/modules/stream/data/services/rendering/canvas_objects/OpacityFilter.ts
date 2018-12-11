import {AbstractBaseRectangleObject} from "@Lib/graphics";

export class OpacityFilter extends AbstractBaseRectangleObject {

  public configuration = {
    value: 100
  };

  public setDisabled(disabled: boolean): void {

    if (disabled) {
      this.dispose();
    }

    super.setDisabled(disabled);
  }

  public isInteractive(): boolean {
    return false;
  }

  public isMovable(): boolean {
    return false;
  }

  public renderSelf(): void {

    const context: CanvasRenderingContext2D = this.getContext();
    const configuration = this.configuration;

    context.filter = `opacity(${configuration.value}%)`;
  }

  public dispose(): void {

    const context: CanvasRenderingContext2D = this.getContext();

    context.filter = "opacity(100%)";
  }

}
