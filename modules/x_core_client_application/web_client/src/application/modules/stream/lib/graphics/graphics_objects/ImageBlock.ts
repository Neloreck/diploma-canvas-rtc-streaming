// Lib.
import { AbstractBaseRectangleObject, ISerializedGraphicsObject } from "@Lib/graphics";
import { Optional } from "@Lib/ts/types";

// Api.
import { loadImage } from "@Api/general";

export interface IImageBlockConfig {
  height: number;
  image: HTMLImageElement;
  imageSrc: string;
  width: number;
}

export class ImageBlock extends AbstractBaseRectangleObject<IImageBlockConfig> {

  public readonly config: IImageBlockConfig = {
    height: 360,
    image: new Image(1280, 720) ,
    imageSrc: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    width: 640,
  };

  private loaded: boolean = false;

  public constructor(source?: string) {
    super();

    this.setNewUrl(source || this.config.imageSrc);
  }

  public getCopy(): ImageBlock {
    return new ImageBlock(this.config.imageSrc);
  }

  public applySerialized(serialized: ISerializedGraphicsObject): void {
    super.applySerialized(serialized);
    this.setNewUrl(this.config.imageSrc);
  }

  public applyConfiguration(src: typeof ImageBlock.prototype.config | ImageBlock): void {
    super.applyConfiguration(src);
    this.setNewUrl((src as typeof ImageBlock.prototype.config).imageSrc || (src as ImageBlock).config.imageSrc);
  }

  public async setNewUrl(src: string): Promise<void> {

    this.loaded = false;

    this.config.imageSrc = src;
    this.config.image = new Image(this.config.width, this.config.height);
    this.config.image.addEventListener("load", () => this.loaded = true);

    try {
      const reader: Optional<FileReader> = await loadImage(this.config.imageSrc);

      if (reader) {
        this.config.image.src = reader.result as string;
      }

    } catch (error) {
      // Got error, nothing to do by now.
      this.loaded = false;
    }

  }

  public renderSelf(context: CanvasRenderingContext2D): void {

    const { widthPercent: pWidth, heightPercent: pHeight } = this.getBasePercentSizing();
    const { image } = this.config;

    if (this.loaded) {
      context.drawImage(image, pWidth * this.position.left, pHeight * this.position.top, pWidth * this.position.width, pHeight * this.position.height);
    } else {
      context.fillStyle = "#333";

      context.beginPath();
      context.fillRect(pWidth * this.position.left, pHeight * this.position.top, pWidth * this.position.width, pHeight * this.position.height);
      context.closePath();
    }
  }

}
