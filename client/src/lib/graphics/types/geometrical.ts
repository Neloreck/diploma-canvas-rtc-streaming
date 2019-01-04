export interface IPoint {
  x: number;
  y: number;
}

export interface IBoundingRect {
  topLeft: IPoint;
  topRight: IPoint;
  botRight: IPoint;
  botLeft: IPoint;
}

export interface ICanvasGraphicsSizingContext {
  width: number;
  height: number;
}

export interface ICircleSizing {
  radius: number;
  center: IPoint;
}

export interface IRectSizing {
  left: number;
  top: number;
  width: number;
  height: number;
}

export type TObjectPosition = { center: IPoint, radius: number } | IRectSizing;
