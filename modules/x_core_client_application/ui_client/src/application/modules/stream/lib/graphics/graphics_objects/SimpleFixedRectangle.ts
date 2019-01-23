import {
  AbstractBaseFixedPositionRectangleObject,
  EObjectFixedSize, fixedObjectsGrid,
  IAbstractSizing,
  IPoint
} from "@Lib/graphics";
import {fixedObjectsSizing} from "@Lib/graphics/graphics_objects/utils/fixedObjectPosition";

export interface ISimpleFixedRectangleConfig {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  root: IPoint;
  renderBackground: boolean;
  size: number;
}

export class SimpleFixedRectangle extends AbstractBaseFixedPositionRectangleObject<ISimpleFixedRectangleConfig> {

  public readonly config: ISimpleFixedRectangleConfig = {
    backgroundColor: "#666",
    borderColor: "#000000",
    borderWidth: 3,
    renderBackground: true,
    root: { x: 0, y: 0 },
    size: EObjectFixedSize.XS
  };

  protected readonly sizingPresets: Array<IAbstractSizing> = [
    fixedObjectsSizing[EObjectFixedSize.XS],
    fixedObjectsSizing[EObjectFixedSize.SM_HOR],
    fixedObjectsSizing[EObjectFixedSize.MD_HOR],
    fixedObjectsSizing[EObjectFixedSize.LG_HOR],
    fixedObjectsSizing[EObjectFixedSize.XL_HOR]
  ];

  public constructor() {
    super(fixedObjectsGrid[0][0], fixedObjectsSizing[EObjectFixedSize.XS]);
  }

  public renderSelf(context: CanvasRenderingContext2D): void {

    const { widthPercent: pWidth, heightPercent: pHeight } = this.getBasePercentSizing();
    const configuration: ISimpleFixedRectangleConfig = this.config;

    context.strokeStyle = this.config.borderColor;
    context.lineWidth = this.config.borderWidth;

    context.beginPath();

    if (configuration.renderBackground) {
      context.fillStyle = configuration.backgroundColor;
      context.fillRect(pWidth * this.position.left, pHeight * this.position.top, pWidth * this.position.width, pHeight * this.position.height);
    }

    context.rect(pWidth * this.position.left, pHeight * this.position.top, pWidth * this.position.width, pHeight * this.position.height);
    context.stroke();
    context.closePath();
  }

}
