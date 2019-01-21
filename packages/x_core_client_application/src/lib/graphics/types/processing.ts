import {TObjectPosition} from "./geometrical";

export interface ISerializedGraphicsObject {
  className: string;
  configuration: any;
  position: TObjectPosition;
}
