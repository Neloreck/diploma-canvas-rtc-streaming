// Lib.
import {AbstractBaseRectangleObject} from "@Lib/graphics";
import {Optional} from "@Lib/ts/types";

// Api.
import {resourceLoader} from "@Api/general";

export class ImageBlock extends AbstractBaseRectangleObject<typeof ImageBlock.prototype.configuration> {

  public readonly configuration = {
    height: 720,
    image: new Image(1280, 720) ,
    imageSrc: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    width: 1280,
  };

  private loaded = false;

  public constructor(source?: string) {
    super();

    this.configuration.imageSrc = source || this.configuration.imageSrc;

    this.configuration.image.addEventListener("load", () => this.loaded = true);

    resourceLoader.loadImage(this.configuration.imageSrc)
      .then((reader: Optional<FileReader>) => reader ? this.configuration.image.src = reader.result as string : null)
      .catch(() => this.loaded = false);
  }

  public getCopy(): ImageBlock {

    const cloned: ImageBlock = new ImageBlock(this.configuration.imageSrc);

    cloned.configuration.width = this.configuration.width;
    cloned.configuration.height = this.configuration.height;

    return cloned;
  }

  public applyConfiguration(configuration: typeof ImageBlock.prototype.configuration): void {
    this.loaded = false;
    super.applyConfiguration(configuration);
  }

  public async setNewUrl(src: string): Promise<void> {

    this.loaded = false;

    this.configuration.imageSrc = src;
    this.configuration.image = new Image(this.configuration.width, this.configuration.height);
    this.configuration.image.addEventListener("load", () => this.loaded = true);

    try {
      const reader: Optional<FileReader> = await resourceLoader.loadImage(this.configuration.imageSrc);

      if (reader) {
        this.configuration.image.src = reader.result as string;
      }

    } catch (error) {
      // Got error, nothing to do by now.
      this.loaded = false;
    }

  }

  public renderSelf(context: CanvasRenderingContext2D): void {

    const {widthPercent: pWidth, heightPercent: pHeight} = this.getBasePercentSizing();
    const {image} = this.configuration;

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
    delete this.configuration.image;
    super.dispose();
  }

}
