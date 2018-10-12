import {ActionWired, DataExchangeAction} from "redux-cbd";

import {CanvasGraphicsRenderObject} from "@Lib/react_lib/canvas_video_graphics";

@ActionWired("ADD_GRAPHICS_OBJECT")
export class AddGraphicsObjectAction extends DataExchangeAction<{ object: CanvasGraphicsRenderObject } > {
}
