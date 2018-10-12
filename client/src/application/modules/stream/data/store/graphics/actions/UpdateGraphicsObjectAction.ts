import {ActionWired, DataExchangeAction} from "redux-cbd";

import {CanvasGraphicsRenderObject} from "@Lib/react_lib/canvas_video_graphics";

@ActionWired("UPDATE_GRAPHICS_OBJECT")
export class UpdateGraphicsObjectAction extends DataExchangeAction<{ object: CanvasGraphicsRenderObject } > {
}
