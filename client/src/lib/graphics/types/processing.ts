import {TObjectPosition} from "./geometrical";

export interface ISerializedGraphicsObject {
  class: string;
  configuration: any;
  position: TObjectPosition;
}
