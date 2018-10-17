import {Optional} from "@Lib/ts/type";
import {WithStyles} from "@material-ui/core";

import {ICanvasObjectDescriptor} from "@Module/stream/data/services/rendering";

import {canvasObjectAdditionManagerStyle} from "./CanvasObjectAdditionManager.Style";

export interface ICanvasObjectAdditionManagerState {
  showAdditionWindow: boolean;
}

export interface ICanvasObjectAdditionManagerStoreProps {
  inputStream: Optional<MediaStream>;
}

export interface ICanvasObjectAdditionManagerDispatchProps {
  onObjectAdded: (object: ICanvasObjectDescriptor<any>) => void;
  onObjectChanged: (object: ICanvasObjectDescriptor<any>) => void;
  onObjectRemoved: (object: ICanvasObjectDescriptor<any>) => void;
}

export interface ICanvasObjectAdditionManagerExternalProps extends ICanvasObjectAdditionManagerStoreProps,
  ICanvasObjectAdditionManagerDispatchProps, WithStyles<typeof canvasObjectAdditionManagerStyle> {
}

export interface ICanvasObjectAdditionManagerOwnProps {
}

export interface ICanvasObjectAdditionManagerProps extends ICanvasObjectAdditionManagerOwnProps, ICanvasObjectAdditionManagerExternalProps {
}
