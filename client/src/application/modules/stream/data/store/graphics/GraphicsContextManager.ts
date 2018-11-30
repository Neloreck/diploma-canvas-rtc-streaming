import {ReactContextManager} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";

// Lib.
import {CanvasGraphicsRenderObject} from "@Lib/graphics";
import {Optional} from "@Lib/ts/type";
import {Logger} from "@Lib/util/logger";

// Props.
export interface IGraphicsContext {
  graphicsState: {
    addVisibleObjects: boolean;
    objects: Array<CanvasGraphicsRenderObject>;
    propagateRendererEvents: boolean;
    selectedObject: Optional<CanvasGraphicsRenderObject>;
    showMainVideo: boolean;
    showGraphics: boolean;
    showGrid: boolean;
    showPreview: boolean;
  };
  graphicsActions: {
    addObject: (object: CanvasGraphicsRenderObject) => void,
    swapObjectsByIndex: (firstIndex: number, secondIndex: number) => void,
    removeObject: (object: CanvasGraphicsRenderObject) => void,
    selectObject: (object: Optional<CanvasGraphicsRenderObject>) => void,
    setAdditionVisibility: (param: boolean) => void;
    setRendererEventsPropagation: (param: boolean) => void;
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
      selectObject: this.selectObject,
      setAdditionVisibility: this.setAdditionVisibility,
      setGraphicsDisplay: this.setGraphicsDisplay,
      setGridDisplay: this.setGridDisplay,
      setMainVideoDisplay: this.setMainVideoDisplay,
      setPreviewDisplay: this.setPreviewDisplay,
      setRendererEventsPropagation: this.setRendererEventsPropagation,
      swapObjectsByIndex: this.swapObjectsByIndex
    },
    graphicsState: {
      addVisibleObjects: true,
      objects: [],
      propagateRendererEvents: false,
      selectedObject: null,
      showGraphics: true,
      showGrid: false,
      showMainVideo: true,
      showPreview: false
    }
  };

  private logger: Logger = new Logger("[GC]", true);

  @Bind()
  protected addObject(object: CanvasGraphicsRenderObject): void {

    this.logger.info("Adding new object:", object);

    if (!this.context.graphicsState.addVisibleObjects) {
      object.setDisabled(true);
    }

    this.context.graphicsState = { ...this.context.graphicsState, objects: this.context.graphicsState.objects.concat(object)};
    this.update();
  }

  @Bind()
  protected removeObject(object: CanvasGraphicsRenderObject): void {

    this.logger.info("Removing object:", object);

    this.context.graphicsState = { ...this.context.graphicsState, objects: this.context.graphicsState.objects.filter((it) => it !== object)};

    if (object === this.context.graphicsState.selectedObject) {
      this.context.graphicsState.selectedObject = null;
    }

    this.update();
    object.dispose();
  }

  @Bind()
  protected selectObject(selectedObject: Optional<CanvasGraphicsRenderObject>): void {

    this.logger.info("Selected object:", selectedObject);

    this.context.graphicsState = { ...this.context.graphicsState, selectedObject };
    this.update();
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
  protected setRendererEventsPropagation(propagateRendererEvents: boolean): void {
    this.context.graphicsState = { ...this.context.graphicsState, propagateRendererEvents };
    this.update();
  }

  @Bind()
  protected swapObjectsByIndex(firstIndex: number, secondIndex: number): void {

    this.logger.info(`Swapping object layout order: ${firstIndex} <-> ${secondIndex}.`);

    const buffer: CanvasGraphicsRenderObject = this.context.graphicsState.objects[firstIndex];

    this.context.graphicsState = { ...this.context.graphicsState, objects: [...this.context.graphicsState.objects] };
    this.context.graphicsState.objects[firstIndex] = this.context.graphicsState.objects[secondIndex];
    this.context.graphicsState.objects[secondIndex] = buffer;

    this.update();
  }

}
