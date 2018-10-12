import {WithStyles} from "@material-ui/core";

import {CanvasGraphicsRenderObject} from "@Lib/react_lib/canvas_video_graphics";

import {canvasObjectAdditionManagerStyle} from "./CanvasObjectAdditionManager.Style";

export interface ICanvasObjectAdditionManagerStoreProps {
  objects: Array<CanvasGraphicsRenderObject>;
}

export interface ICanvasObjectAdditionManagerDispatchProps {
  onObjectAdded: (object: CanvasGraphicsRenderObject) => void;
  onObjectChanged: (object: CanvasGraphicsRenderObject) => void;
  onObjectRemoved: (object: CanvasGraphicsRenderObject) => void;
}

export interface ICanvasObjectAdditionManagerExternalProps extends ICanvasObjectAdditionManagerStoreProps,
  ICanvasObjectAdditionManagerDispatchProps, WithStyles<typeof canvasObjectAdditionManagerStyle> {
}

export interface ICanvasObjectAdditionManagerOwnProps {
}

export interface ICanvasObjectAdditionManagerProps extends ICanvasObjectAdditionManagerOwnProps, ICanvasObjectAdditionManagerExternalProps {
}
