import {ActionHandler, ReflectiveReducer} from "redux-cbd";

import {CanvasGraphicsRenderObject} from "@Lib/react_lib/canvas_video_graphics";

import {AddGraphicsObjectAction, RemoveGraphicsObjectAction, UpdateGraphicsObjectAction} from "./actions";
import {GraphicsState} from "./GraphicsState";

export class GraphicsReducer extends ReflectiveReducer<GraphicsState>  {

  @ActionHandler
  public addGraphicsObject(state: GraphicsState, action: AddGraphicsObjectAction): GraphicsState {

    const objects: Array<CanvasGraphicsRenderObject> = [
      new action.payload.object.prototype.constructor()
    ].concat(state.objects);

    return { ...state, objects };
  }

  @ActionHandler
  public removeGraphicsObject(state: GraphicsState, action: RemoveGraphicsObjectAction): GraphicsState {
    return { ...state, objects: [action.payload.object] };
  }

  @ActionHandler
  public changeGraphicsObject(state: GraphicsState, action: UpdateGraphicsObjectAction): GraphicsState {
    return { ...state, objects: [action.payload.object] };
  }

}
