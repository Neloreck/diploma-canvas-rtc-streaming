import {ActionWired, DataExchangeAction} from "redux-cbd";

import {ICanvasObjectDescriptor} from "@Module/stream/data/services/rendering";

@ActionWired("ADD_GRAPHICS_OBJECT")
export class AddGraphicsObjectAction extends DataExchangeAction<{ object: ICanvasObjectDescriptor<any> } > {
}
