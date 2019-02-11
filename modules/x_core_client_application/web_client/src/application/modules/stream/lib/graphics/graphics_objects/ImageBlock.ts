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
    height: 720,
    image: new Image(1280, 720) ,
    imageSrc: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    width: 1280,
  };

  private loaded: boolean = false;

  public constructor(source?: string) {
    super();

    this.config.imageSrc = source || this.config.imageSrc;

    this.config.image.addEventListener("load", () => this.loaded = true);

    loadImage(this.config.imageSrc)
      .then((reader: Optional<FileReader>) => reader ? this.config.image.src = reader.result as string : null)
      .catch(() => this.loaded = false);
  }

  public getCopy(): ImageBlock {

    const cloned: ImageBlock = new ImageBlock(this.config.imageSrc);

    cloned.config.width = this.config.width;
    cloned.config.height = this.config.height;

    return cloned;
  }

  public applySerialized(serialized: ISerializedGraphicsObject): void {
    super.applySerialized(serialized);
    this.setNewUrl(this.config.imageSrc);
  }

  public applyConfiguration(configuration: typeof ImageBlock.prototype.config): void {
    this.loaded = false;
    super.applyConfiguration(configuration);
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

  public dispose(): void {
    this.loaded = false;
    delete this.config.image;
    super.dispose();
  }

}
