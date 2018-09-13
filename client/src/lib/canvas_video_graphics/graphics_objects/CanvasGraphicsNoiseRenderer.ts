import {CanvasGraphicsRenderObject} from "./CanvasGraphicsRenderObject";

export class CanvasGraphicsNoiseRenderer extends CanvasGraphicsRenderObject {

  private readonly cacheSize: number = 10;
  private static readonly cachedImages: Array<string> = [];

  public renderSelf(): void {

    const {width, height} = this.getSizing();

    const context: CanvasRenderingContext2D = this.getContext();
    const img = new Image();

    if (CanvasGraphicsNoiseRenderer.cachedImages.length < this.cacheSize) {
      const noise = this.getRenderedNoise();

      CanvasGraphicsNoiseRenderer.cachedImages.push(noise);
      img.src = noise;

      context.drawImage(img, 0, 0, width, height);
    } else {
      img.src = CanvasGraphicsNoiseRenderer.cachedImages[Math.floor(Math.random() * (this.cacheSize - 1))];
      context.drawImage(img, 0, 0, width, height);
    }
  }

  private getRenderedNoise(): string {

    const [width, height] = [800, 450];

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvas.width = width;
    canvas.height = height;

    const skipConst: number = 5;

    for (let x = 0; x < width; x += skipConst) {
      for (let y = 0; y < height; y += skipConst) {
        const num: number = Math.floor(Math.random() * 160);

        context.fillStyle = "rgba(" + num + "," + num + "," + num + "," + 0.9 + ")";
        context.fillRect(x, y, skipConst, skipConst);
      }
    }

    return canvas.toDataURL("image/png");
  }

}
