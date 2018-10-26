import {WithStyles} from "@material-ui/core";

import {ICanvasObjectDescriptor} from "@Module/stream/data/services/rendering";

import {canvasObjectsAdditionListStyle} from "./CanvasObjectsAdditionList.Style";

export interface ICanvasObjectAdditionState {
}

export interface ICanvasObjectsAdditionListExternalProps extends WithStyles<typeof canvasObjectsAdditionListStyle> {
}

export interface ICanvasObjectsAdditionListOwnProps {
  onObjectAdded: (object: ICanvasObjectDescriptor<any>) => void;
}

export interface ICanvasObjectsAdditionListProps extends ICanvasObjectsAdditionListOwnProps, ICanvasObjectsAdditionListExternalProps {
}
