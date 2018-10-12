import {ActionWired, DataExchangeAction} from "redux-cbd";

import {CanvasGraphicsRenderObject} from "@Lib/react_lib/canvas_video_graphics";

@ActionWired("REMOVE_GRAPHICS_OBJECT")
export class RemoveGraphicsObjectAction extends DataExchangeAction<{ object: CanvasGraphicsRenderObject } > {
}
