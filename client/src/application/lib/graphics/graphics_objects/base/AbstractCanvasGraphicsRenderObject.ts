import {cloneDeep} from "lodash";
import {ICanvasGraphicsSizingContext} from "../../types";
import {generateUUID} from "../../utils";

export abstract class AbstractCanvasGraphicsRenderObject {

  public abstract configuration: any;

  protected readonly createdAt: number = Date.now();
  protected readonly id: string = "0";

  private name: string | null = null;

  private disabled: boolean = false;
  private context: CanvasRenderingContext2D = null as any;
  private sizing: ICanvasGraphicsSizingContext = null as any;

  public constructor() {
    this.id = generateUUID();
  }

  // Identity.

  public getId(): string {
    return this.id;
  }

  // Naming.

  public getName(): string | null {
    return this.name;
  }

  public setName(name: string | null): void {
    this.name = name;
  }

  // Rendering context.

  public setContext(context: CanvasRenderingContext2D): void {
    this.context = context;
  }

  public getContext(): CanvasRenderingContext2D {
    return this.context;
  }

  public setSizing(sizing: ICanvasGraphicsSizingContext) {
    this.sizing = sizing;
  }

  public getSizing(): ICanvasGraphicsSizingContext {
    return this.sizing;
  }

  // Rendering props.

  public setDisabled(disabled: boolean): void {
    this.disabled = disabled;
  }

  public isEnabled(): boolean {
    return !this.disabled;
  }

  public isDisabled(): boolean {
    return this.disabled;
  }

  // Sub props related.

  public isMovable(): boolean {
    return false;
  }

  public isResizable(): boolean {
    return false;
  }

  public isInteractive(): boolean {
    return false;
  }

  // Cleanup lifecycle related.

  public render(context: CanvasRenderingContext2D): void {
    this.setContext(context);
    this.beforeRender();
    this.renderSelf();
    this.afterRender();
    this.cleanupContext();
  }

  public dispose(): void {
    /* Some objects need destruction */
  }

  public getCopy(): AbstractCanvasGraphicsRenderObject {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), cloneDeep(this), { id: generateUUID() });
  }

  protected beforeRender(): void {
    /* Some objects need handling */
  }

  protected afterRender(): void {
    /* Some objects need handling */
  }

  protected cleanupContext(): void {
    // Default render props.
    this.context.lineWidth = 2;
    this.context.strokeStyle = "#000";
    this.context.fillStyle = "#000";
  }

  protected abstract renderSelf(): void;

  // Private context related implementation.

  protected percentsToAbsoluteWidth(percents: number): number {
    return this.sizing.width * percents / 100;
  }

  protected percentsToAbsoluteHeight(percents: number): number {
    return this.sizing.height * percents / 100;
  }

  protected absoluteToPercentsWidth(absolute: number): number {
    return absolute * 100 / this.sizing.width;
  }

  protected absoluteToPercentsHeight(absolute: number): number {
    return absolute * 100 / this.sizing.height;
  }

  protected getBasePercentSizing(): { widthPercent: number; heightPercent: number; } {
    return { widthPercent: this.sizing.width / 100, heightPercent: this.sizing.height / 100 };
  }

}
