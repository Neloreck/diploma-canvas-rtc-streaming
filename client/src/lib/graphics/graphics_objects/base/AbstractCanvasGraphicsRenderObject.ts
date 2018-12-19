import {cloneDeep} from "lodash";
import {ICanvasGraphicsSizingContext} from "../../types";
import {generateUUID} from "../../utils";
import {AbstractCanvasGraphicsSerializableObject} from "./AbstractCanvasGraphicsSerializableObject";

export abstract class AbstractCanvasGraphicsRenderObject extends AbstractCanvasGraphicsSerializableObject {

  protected readonly createdAt: number = Date.now();
  protected readonly id: string = "0";

  private name: string | null = null;
  private disabled: boolean = false;
  private context: CanvasRenderingContext2D = null as any;
  private sizing: ICanvasGraphicsSizingContext = null as any;

  public constructor() {
    super();
    this.id = generateUUID();
  }

  // Identity.

  public getId(): string {
    return this.id;
  }

  public getName(): string | null {
    return this.name || this.constructor.name;
  }

  public setName(name: string | null): void {
    this.name = name;
  }

  /*
   * Rendering context related.
   */

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

  /*
   * Should render.
   */

  public setDisabled(disabled: boolean): void {
    this.disabled = disabled;
  }

  public isEnabled(): boolean {
    return !this.disabled;
  }

  public isDisabled(): boolean {
    return this.disabled;
  }

  /*
   * Type cast related.
   */

  public isMovable(): boolean {
    return false;
  }

  public isResizable(): boolean {
    return false;
  }

  public isInteractive(): boolean {
    return false;
  }

  /*
   * Cleanup lifecycle related.
   */

  public render(context: CanvasRenderingContext2D): void {
    this.setContext(context);
    this.beforeRender();
    this.renderSelf(context);
    this.afterRender();
    this.cleanupContext();
  }

  public dispose(): void {
    /* Some objects need destruction and memory cleanup. */
  }

  public getCopy(): AbstractCanvasGraphicsRenderObject {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), cloneDeep(this), { id: generateUUID() });
  }

  /*
   * ===================================================================================================================
   * = Private | Protected                                                                                             =
   * ===================================================================================================================
   */

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

  protected abstract renderSelf(context: CanvasRenderingContext2D): void;

  /*
   * Related sizing.
   */

  protected percentsToAbsoluteWidth(percents: number): number {
    return (this.sizing.width * percents / 100);
  }

  protected percentsToAbsoluteHeight(percents: number): number {
    return (this.sizing.height * percents / 100);
  }

  protected absoluteToPercentsWidth(absolute: number): number {
    return (absolute * 100 / this.sizing.width);
  }

  protected absoluteToPercentsHeight(absolute: number): number {
    return (absolute * 100 / this.sizing.height);
  }

  protected getBasePercentSizing(): { widthPercent: number; heightPercent: number; } {
    return { widthPercent: this.sizing.width / 100, heightPercent: this.sizing.height / 100 };
  }

}
