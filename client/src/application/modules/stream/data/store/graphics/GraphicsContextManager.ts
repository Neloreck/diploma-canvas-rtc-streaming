import {ReactContextManager} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";

import {CanvasGraphicsRenderObject} from "@Lib/react_lib/canvas_video_graphics";

export interface IGraphicsContext {
  graphicsState: {
    addVisibleObjects: boolean;
    objects: Array<CanvasGraphicsRenderObject>;
    showMainVideo: boolean;
    showGraphics: boolean;
    showGrid: boolean;
    showPreview: boolean;
  };
  graphicsActions: {
    addObject: (object: CanvasGraphicsRenderObject) => void,
    swapObjectsByIndex: (firstIndex: number, secondIndex: number) => void,
    removeObject: (object: CanvasGraphicsRenderObject) => void,
    setAdditionVisibility: (param: boolean) => void;
    setMainVideoDisplay: (param: boolean) => void;
    setGridDisplay: (param: boolean) => void;
    setGraphicsDisplay: (param: boolean) => void;
    setPreviewDisplay: (param: boolean) => void;
  };
}

export class GraphicsContextManager extends ReactContextManager<IGraphicsContext> {

  protected context: IGraphicsContext = {
    graphicsActions: {
      addObject: this.addObject,
      removeObject: this.removeObject,
      setAdditionVisibility: this.setAdditionVisibility,
      setGraphicsDisplay: this.setGraphicsDisplay,
      setGridDisplay: this.setGridDisplay,
      setMainVideoDisplay: this.setMainVideoDisplay,
      setPreviewDisplay: this.setPreviewDisplay,
      swapObjectsByIndex: this.swapObjectsByIndex
    },
    graphicsState: {
      addVisibleObjects: true,
      objects: [],
      showGraphics: true,
      showGrid: false,
      showMainVideo: true,
      showPreview: false
    }
  };

  @Bind()
  protected addObject(object: CanvasGraphicsRenderObject): void {

    if (!this.context.graphicsState.addVisibleObjects) {
      object.setDisabled(true);
    }

    this.context.graphicsState = { ...this.context.graphicsState, objects: this.context.graphicsState.objects.concat(object)};
    this.update();
  }

  @Bind()
  protected removeObject(object: CanvasGraphicsRenderObject): void {
    this.context.graphicsState = { ...this.context.graphicsState, objects: this.context.graphicsState.objects.filter((it) => it !== object)};
    this.update();

    object.dispose();
  }

  @Bind()
  protected setAdditionVisibility(addVisibleObjects: boolean): void {
    this.context.graphicsState = { ...this.context.graphicsState, addVisibleObjects };
    this.update();
  }

  @Bind()
  protected setMainVideoDisplay(showMainVideo: boolean): void {
    this.context.graphicsState = { ...this.context.graphicsState, showMainVideo };
    this.update();
  }

  @Bind()
  protected setGridDisplay(showGrid: boolean): void {
    this.context.graphicsState = { ...this.context.graphicsState, showGrid };
    this.update();
  }

  @Bind()
  protected setGraphicsDisplay(showGraphics: boolean): void {
    this.context.graphicsState = { ...this.context.graphicsState, showGraphics };
    this.update();
  }

  @Bind()
  protected setPreviewDisplay(showPreview: boolean): void {
    this.context.graphicsState = { ...this.context.graphicsState, showPreview };
    this.update();
  }

  @Bind()
  protected swapObjectsByIndex(firstIndex: number, secondIndex: number): void {

    const buffer: CanvasGraphicsRenderObject = this.context.graphicsState.objects[firstIndex];

    this.context.graphicsState.objects[firstIndex] = this.context.graphicsState.objects[secondIndex];
    this.context.graphicsState.objects[secondIndex] = buffer;

    this.context.graphicsState = { ...this.context.graphicsState, objects: [...this.context.graphicsState.objects] };
    this.update();
  }

}
