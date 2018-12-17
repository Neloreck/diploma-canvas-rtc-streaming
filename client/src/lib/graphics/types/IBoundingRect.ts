import {IPoint} from "./IPoint";

export interface IBoundingRect {
  topLeft: IPoint;
  topRight: IPoint;
  botRight: IPoint;
  botLeft: IPoint;
}
