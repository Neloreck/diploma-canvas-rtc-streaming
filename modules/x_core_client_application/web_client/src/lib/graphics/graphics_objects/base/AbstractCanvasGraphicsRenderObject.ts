import { cloneDeep } from "lodash";
import { ICanvasGraphicsSizingContext } from "../../types";
import { generateUUID } from "../../utils";
import { AbstractCanvasGraphicsSerializableObject } from "./AbstractCanvasGraphicsSerializableObject";

export abstract class AbstractCanvasGraphicsRenderObject<T extends object> extends AbstractCanvasGraphicsSerializableObject<T> {

  public readonly id: string = "0";

  protected readonly createdAt: number = Date.now();

  protected readonly disabledColor: string = "rgba(2000, 10, 10, 0.3)";

  protected name: string | null = null;
  protected sizing: ICanvasGraphicsSizingContext = null as any;

  protected visible: boolean = true;
  protected disabled: boolean = false;
  protected context: CanvasRenderingContext2D = null as any;

  protected constructor();
  protected constructor(id?: string) {
    super();
    this.id = id || generateUUID();
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

  public setSizing(sizing: ICanvasGraphicsSizingContext): void {
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

  public toggleEnabled(): void {
    this.disabled = !this.disabled;
  }

  /*
   * Should render.
   */

  public setVisible(visible: boolean): void {
    this.visible = visible;
  }

  public isVisible(): boolean {
    return this.visible;
  }

  public isInvisible(): boolean {
    return !this.visible;
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

  public hasFixedSizing(): boolean {
    return false;
  }

  /*
   * Cleanup lifecycle related.
   */

  public render(context: CanvasRenderingContext2D): void {

    this.setContext(context);
    this.beforeRender(context);
    this.renderSelf(context);

    if (this.disabled) {
      this.renderDisabled(context);
    }

    this.afterRender(context);
    this.cleanupContext();
  }

  public renderDisabled(context: CanvasRenderingContext2D): void {
    /* Do nothing. */
  }

  public dispose(): void {
    this.config = null as any;
    this.context = null as any;
    this.sizing = null as any;
  }

  public getCopy(): AbstractCanvasGraphicsRenderObject<T> {

    const cloned: AbstractCanvasGraphicsRenderObject<T> = new (Object.getPrototypeOf(this)).constructor(generateUUID());

    cloned.position = cloneDeep(this.position);
    cloned.config = cloneDeep(this.config);

    return cloned;
  }

  /*
   * ===================================================================================================================
   * = Private | Protected                                                                                             =
   * ===================================================================================================================
   */

  protected beforeRender(context: CanvasRenderingContext2D): void {
    /* Some objects need handling */
  }

  protected afterRender(context: CanvasRenderingContext2D): void {
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
