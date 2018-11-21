import {ReactContextManager} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";

import {CanvasGraphicsRenderObject} from "@Lib/react_lib/canvas_video_graphics";

export interface IGraphicsContextState {
  graphicsState: {
    objects: Array<CanvasGraphicsRenderObject>;
    showGraphics: boolean;
    showGrid: boolean;
    showPreview: boolean;
  };
  graphicsActions: {
    addObject: (object: CanvasGraphicsRenderObject) => void,
    removeObject: (object: CanvasGraphicsRenderObject) => void,
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
      setGraphicsDisplay: this.setGraphicsDisplay,
      setGridDisplay: this.setGridDisplay,
      setPreviewDisplay: this.setPreviewDisplay
    },
    graphicsState: {
      objects: [],
      showGraphics: true,
      showGrid: false,
      showPreview: false
    }
  };

  @Bind()
  protected addObject(object: CanvasGraphicsRenderObject): void {
    this.state.graphicsState = { ...this.state.graphicsState, objects: this.state.graphicsState.objects.concat(object)};
    this.update();
  }

  @Bind()
  protected removeObject(object: CanvasGraphicsRenderObject): void {
    this.state.graphicsState = { ...this.state.graphicsState, objects: this.state.graphicsState.objects.filter((it) => it !== object)};
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

}
