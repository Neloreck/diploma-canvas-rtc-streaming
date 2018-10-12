import {ActionHandler, ReflectiveReducer} from "redux-cbd";

import {AddGraphicsObjectAction, RemoveGraphicsObjectAction, UpdateGraphicsObjectAction} from "./actions";
import {GraphicsState} from "./GraphicsState";

export class GraphicsReducer extends ReflectiveReducer<GraphicsState>  {

  @ActionHandler
  public addGraphicsObject(state: GraphicsState, action: AddGraphicsObjectAction): GraphicsState {
    return { ...state, objects: [action.payload.object] };
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
