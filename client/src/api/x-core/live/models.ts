export interface ISerializedGraphicsObject {
  className: string;
  position: string;
  config: string;
}

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
  graphicsObject: Array<any> | null;
}
