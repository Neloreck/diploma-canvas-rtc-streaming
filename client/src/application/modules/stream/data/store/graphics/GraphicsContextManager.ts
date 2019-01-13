import {ReactContextManager} from "@redux-cbd/context";
import {Bind} from "@redux-cbd/utils";

// Lib.
import {AbstractCanvasGraphicsRenderObject} from "@Lib/graphics";
import {Optional} from "@Lib/ts/types";
import {Logger} from "@Lib/utils";

// Data.
import {renderingContextManager} from "@Module/stream/data/store";

// Props.
export interface IGraphicsContext {
  graphicsState: {
    objects: Array<AbstractCanvasGraphicsRenderObject<any>>;
    selectedObject: Optional<AbstractCanvasGraphicsRenderObject<any>>;
  };
  graphicsActions: {
    addObject(object: AbstractCanvasGraphicsRenderObject<any>): void,
    eraseObjects(): void,
    swapObjectsByIndex(firstIndex: number, secondIndex: number): void,
    removeObject(object: AbstractCanvasGraphicsRenderObject<any>): void,
    selectObject(object: Optional<AbstractCanvasGraphicsRenderObject<any>>): void,
  };
}

export class GraphicsContextManager extends ReactContextManager<IGraphicsContext> {

  protected context: IGraphicsContext = {
    graphicsActions: {
      addObject: this.addObject,
      eraseObjects: this.eraseObjects,
      removeObject: this.removeObject,
      selectObject: this.selectObject,
      swapObjectsByIndex: this.swapObjectsByIndex
    },
    graphicsState: {
      objects: [],
      selectedObject: null,
    }
  };

  private log: Logger = new Logger("[🏭C-GFX]", true);

  @Bind()
  public dispose(): void {

    const state = this.context.graphicsState;

    state.objects.forEach((object) => object.dispose());
    state.objects = [];
    state.selectedObject = null;

    this.log.info("Disposed graphics storage.");
  }

  @Bind()
  protected addObject(object: AbstractCanvasGraphicsRenderObject<any>): void {

    this.log.info(`Adding new object: ${object.getName()}.`);

    if (!renderingContextManager.context.renderingState.addVisibleObjects) {
      object.setDisabled(true);
    }

    this.context.graphicsState = { ...this.context.graphicsState, objects: this.context.graphicsState.objects.concat(object)};
    this.update();
  }

  @Bind()
  protected eraseObjects(): void {

    const oldObjects: Array<AbstractCanvasGraphicsRenderObject<any>> = this.context.graphicsState.objects;

    this.context.graphicsState = { ...this.context.graphicsState, objects: [], selectedObject: null };
    this.update();

    oldObjects.forEach((object) => object.dispose());
  }

  @Bind()
  protected removeObject(object: AbstractCanvasGraphicsRenderObject<any>): void {

    this.log.info(`Removing object: ${object.getName()}.`);

    this.context.graphicsState = { ...this.context.graphicsState, objects: this.context.graphicsState.objects.filter((it) => it !== object)};

    if (object === this.context.graphicsState.selectedObject) {
      this.context.graphicsState.selectedObject = null;
    }

    this.update();
    object.dispose();
  }

  @Bind()
  protected selectObject(selectedObject: Optional<AbstractCanvasGraphicsRenderObject<any>>): void {

    this.log.info(`Selected object: ${selectedObject && selectedObject.getName()}.`);

    this.context.graphicsState = { ...this.context.graphicsState, selectedObject };
    this.update();
  }

  @Bind()
  protected swapObjectsByIndex(firstIndex: number, secondIndex: number): void {

    this.log.info(`Swapping object layout order: ${firstIndex} <-> ${secondIndex}.`);

    const buffer: AbstractCanvasGraphicsRenderObject<any> = this.context.graphicsState.objects[firstIndex];

    this.context.graphicsState = { ...this.context.graphicsState, objects: [...this.context.graphicsState.objects] };
    this.context.graphicsState.objects[firstIndex] = this.context.graphicsState.objects[secondIndex];
    this.context.graphicsState.objects[secondIndex] = buffer;

    this.update();
  }

}