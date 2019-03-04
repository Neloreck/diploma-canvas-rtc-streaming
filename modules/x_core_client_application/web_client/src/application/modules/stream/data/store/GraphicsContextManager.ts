import { Bind, ContextManager } from "dreamstate";

// Lib.
import { AbstractCanvasGraphicsRenderObject } from "@Lib/graphics";
import { Optional } from "@Lib/ts/types";
import { Logger } from "@Lib/utils";

// Data.
import { renderingContextManager } from "./index";

// Props.
export interface IGraphicsContext {
  graphicsActions: {
    addObject(object: AbstractCanvasGraphicsRenderObject<any>): void,
    eraseObjects(): void,
    swapObjectsByIndex(firstIndex: number, secondIndex: number): void,
    removeObject(object: AbstractCanvasGraphicsRenderObject<any>): void,
    setObjects(objects: Array<AbstractCanvasGraphicsRenderObject<any>>): void,
    selectObject(object: Optional<AbstractCanvasGraphicsRenderObject<any>>): void,
  };
  graphicsState: {
    objects: Array<AbstractCanvasGraphicsRenderObject<any>>;
    selectedObject: Optional<AbstractCanvasGraphicsRenderObject<any>>;
  };
}

export class GraphicsContextManager extends ContextManager<IGraphicsContext> {

  public context: IGraphicsContext = {
    graphicsActions: {
      addObject: this.addObject,
      eraseObjects: this.eraseObjects,
      removeObject: this.removeObject,
      selectObject: this.selectObject,
      setObjects: this.setObjects,
      swapObjectsByIndex: this.swapObjectsByIndex
    },
    graphicsState: {
      objects: [],
      selectedObject: null,
    }
  };

  private readonly setState = ContextManager.getSetter(this, "graphicsState");
  private readonly log: Logger = new Logger("[🏭GFX]", true);

  // Actions.

  @Bind()
  public addObject(object: AbstractCanvasGraphicsRenderObject<any>): void {

    this.log.info(`Adding new object: ${object.getName()}.`);

    if (renderingContextManager.context.renderingState.addDisabledObjects) {
      object.setDisabled(true);
    }

    this.setState({ objects: this.context.graphicsState.objects.concat(object) });
  }

  @Bind()
  public setObjects(objects: Array<AbstractCanvasGraphicsRenderObject<any>>): void {

    const oldObjects: Array<AbstractCanvasGraphicsRenderObject<any>> = this.context.graphicsState.objects;

    this.log.info(`Setting new objects: (${objects.length}).`);
    this.setState({ objects, selectedObject: null });

    // Dispose old objects.
    oldObjects.forEach((object: AbstractCanvasGraphicsRenderObject<any>) => object.dispose());
  }

  @Bind()
  public eraseObjects(): void {

    const oldObjects: Array<AbstractCanvasGraphicsRenderObject<any>> = this.context.graphicsState.objects;

    this.log.info(`Erasing objects.`);
    this.setState({ objects: [], selectedObject: null });

    oldObjects.forEach((object: AbstractCanvasGraphicsRenderObject<any>) => object.dispose());
  }

  @Bind()
  public removeObject(object: AbstractCanvasGraphicsRenderObject<any>): void {

    this.log.info(`Removing object: ${object.getName()}.`);

    const { graphicsState: { objects, selectedObject } } = this.context;
    const filteredObjects: Array<AbstractCanvasGraphicsRenderObject<any>> = objects.filter((it: AbstractCanvasGraphicsRenderObject<any>): boolean => it !== object);

    this.setState({
      objects: filteredObjects,
      selectedObject: object === selectedObject ? null : selectedObject
    });

    object.dispose();
  }

  @Bind()
  public selectObject(selectedObject: Optional<AbstractCanvasGraphicsRenderObject<any>>): void {

    this.log.info(`Selected object: ${selectedObject && selectedObject.getName()}.`);

    this.setState({ selectedObject });
  }

  @Bind()
  public swapObjectsByIndex(firstIndex: number, secondIndex: number): void {

    this.log.info(`Swapping object layout order: ${firstIndex} <-> ${secondIndex}.`);

    const newObjects: Array<AbstractCanvasGraphicsRenderObject<any>> = [...this.context.graphicsState.objects];
    const buffer: AbstractCanvasGraphicsRenderObject<any> = newObjects[firstIndex];

    newObjects[firstIndex] = newObjects[secondIndex];
    newObjects[secondIndex] = buffer;

    this.setState({ objects: newObjects });
  }

  // Lifecycle.

  @Bind()
  protected onProvisionEnded(): void {

    const { graphicsState } = this.context;

    graphicsState.objects.forEach((object: AbstractCanvasGraphicsRenderObject<any>) => object.dispose());
    graphicsState.objects = [];
    graphicsState.selectedObject = null;

    this.log.info("Disposed graphics storage.");
  }

}
