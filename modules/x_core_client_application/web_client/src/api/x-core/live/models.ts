import {ISerializedGraphicsObject} from "@Lib/graphics";

export interface ILiveEvent {
  id: string;
  created: number;
  name: string;
  description: string;
  finished: boolean;
  started: boolean;
  secured: boolean;
  securedKey: string | null;
}

export interface ILiveEventLayoutBookmark {
  id: number;
  created: number;
  name: string;
  graphicsObjects: Array<ISerializedGraphicsObject>;
}
