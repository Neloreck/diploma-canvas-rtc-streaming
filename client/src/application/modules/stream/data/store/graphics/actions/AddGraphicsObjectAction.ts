import {ActionWired, DataExchangeAction} from "@redux-cbd/core";

import {ICanvasObjectDescriptor} from "@Module/stream/data/services/rendering";

@ActionWired("ADD_GRAPHICS_OBJECT")
export class AddGraphicsObjectAction extends DataExchangeAction<{ object: ICanvasObjectDescriptor<any> } > {
}
