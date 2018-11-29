import {generateUUID} from "../../../util/uuid";
import {ICanvasGraphicsSizingContext} from "../../context/ICanvasGraphicsSizingContext";

export abstract class CanvasGraphicsRenderObject {

  public abstract configuration: any;

  protected readonly createdAt: number = Date.now();

  private id: string = "0";
  private name: string | null = null;
  private disabled: boolean = false;
  private context: CanvasRenderingContext2D = null as any;
  private sizing: ICanvasGraphicsSizingContext = null as any;

  public constructor() {
    this.id = generateUUID();
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string | null {
    return this.name;
  }

  public setName(name: string | null): void {
    this.name = name;
  }

  public setContext(context: CanvasRenderingContext2D): void {
    this.context = context;
  }

  public setSizing(sizing: ICanvasGraphicsSizingContext) {
    this.sizing = sizing;
  }

  public getContext(): CanvasRenderingContext2D {
    return this.context;
  }

  public getSizing(): ICanvasGraphicsSizingContext {
    return this.sizing;
  }

  public setDisabled(disabled: boolean): void {
    this.disabled = disabled;
  }

  public isDisabled(): boolean {
    return this.disabled;
  }

  public isMovable(): boolean {
    return false;
  }

  public isResizable(): boolean {
    return false;
  }

  public isInteractive(): boolean {
    return false;
  }

  public dispose(): void {
    /* Some objects need destruction */
  }

  public render(): void {
    this.beforeRender();
    this.renderSelf();
    this.afterRender();
    this.cleanupContext();
  }

  protected beforeRender(): void {
    /* Some objects need handling */
  }

  protected afterRender(): void {
    /* Some objects need handling */
  }

  protected cleanupContext(): void {
    this.context.lineWidth = 2;
    this.context.strokeStyle = "#000";
    this.context.fillStyle = "#000";
  }

  protected abstract renderSelf(): void;

  // Private implementation.

  protected getPercentageWidth(percents: number): number {
    return this.sizing.width * percents / 100;
  }

  protected getPercentageHeight(percents: number): number {
    return this.sizing.height * percents / 100;
  }

  protected asPercentageWidth(absolute: number): number {
    return absolute * 100 / this.sizing.width;
  }

  protected asPercentageHeight(absolute: number): number {
    return absolute * 100 / this.sizing.height;
  }

  protected getPercentageBaseSizing(): { width: number; height: number; } {
    return { width: this.sizing.width / 100, height: this.sizing.height / 100 };
  }

}
