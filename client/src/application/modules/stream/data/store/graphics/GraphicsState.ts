import {CanvasGraphicsRenderObject} from "@Lib/react_lib/canvas_video_graphics";

export class GraphicsState {

  public objects: Array<CanvasGraphicsRenderObject> = [];

  public showGraphics: boolean = true;
  public showGrid: boolean = false;
  public showPreview: boolean = false;

}
