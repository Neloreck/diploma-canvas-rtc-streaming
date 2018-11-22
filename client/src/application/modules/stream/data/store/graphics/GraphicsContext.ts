import {ReactContextManager} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";

import {CanvasGraphicsRenderObject} from "@Lib/react_lib/canvas_video_graphics";

export interface IGraphicsContextState {
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

export class GraphicsContext extends ReactContextManager<IGraphicsContextState> {

  protected state: IGraphicsContextState = {
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
      showMainVideo: false,
      showPreview: false
    }
  };

  @Bind()
  protected addObject(object: CanvasGraphicsRenderObject): void {

    if (!this.state.graphicsState.addVisibleObjects) {
      object.setDisabled(true);
    }

    this.state.graphicsState = { ...this.state.graphicsState, objects: this.state.graphicsState.objects.concat(object)};
    this.update();
  }

  @Bind()
  protected removeObject(object: CanvasGraphicsRenderObject): void {
    this.state.graphicsState = { ...this.state.graphicsState, objects: this.state.graphicsState.objects.filter((it) => it !== object)};
    this.update();
  }

  @Bind()
  protected setAdditionVisibility(addVisibleObjects: boolean): void {
    this.state.graphicsState = { ...this.state.graphicsState, addVisibleObjects };
    this.update();
  }

  @Bind()
  protected setMainVideoDisplay(showMainVideo: boolean): void {
    this.state.graphicsState = { ...this.state.graphicsState, showMainVideo };
    this.update();
  }

  @Bind()
  protected setGridDisplay(showGrid: boolean): void {
    this.state.graphicsState = { ...this.state.graphicsState, showGrid };
    this.update();
  }

  @Bind()
  protected setGraphicsDisplay(showGraphics: boolean): void {
    this.state.graphicsState = { ...this.state.graphicsState, showGraphics };
    this.update();
  }

  @Bind()
  protected setPreviewDisplay(showPreview: boolean): void {
    this.state.graphicsState = { ...this.state.graphicsState, showPreview };
    this.update();
  }

  @Bind()
  protected swapObjectsByIndex(firstIndex: number, secondIndex: number): void {

    const buffer: CanvasGraphicsRenderObject = this.state.graphicsState.objects[firstIndex];

    this.state.graphicsState.objects[firstIndex] = this.state.graphicsState.objects[secondIndex];
    this.state.graphicsState.objects[secondIndex] = buffer;

    this.state.graphicsState = { ...this.state.graphicsState, objects: [...this.state.graphicsState.objects] };
    this.update();
  }

}
