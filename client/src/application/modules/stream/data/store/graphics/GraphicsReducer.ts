import {ActionHandler, ReflectiveReducer} from "redux-cbd";

import {CanvasGraphicsRenderObject} from "@Lib/react_lib/canvas_video_graphics";

import {
  AddGraphicsObjectAction,
  RemoveGraphicsObjectAction,
  SetGraphicsDisplayAction,
  SetGridDisplayAction,
  SetPreviewModeAction,
  UpdateGraphicsObjectAction
} from "./actions";
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
  public handleToggleGrid(state: GraphicsState, action: SetGridDisplayAction): GraphicsState {
    return { ...state, showGrid: action.payload.show };
  }

  @ActionHandler
  public handleTogglePreviewMode(state: GraphicsState, action: SetPreviewModeAction): GraphicsState {
    return { ...state, showPreview: action.payload.show };
  }

  @ActionHandler
  public handleToggleGraphicsDisplay(state: GraphicsState, action: SetGraphicsDisplayAction): GraphicsState {
    return { ...state, showGraphics: action.payload.show };
  }

  // Todo:

  @ActionHandler
  public removeGraphicsObject(state: GraphicsState, action: RemoveGraphicsObjectAction): GraphicsState {
    return { ...state, objects: [action.payload.object] };
  }

  @ActionHandler
  public changeGraphicsObject(state: GraphicsState, action: UpdateGraphicsObjectAction): GraphicsState {
    return { ...state, objects: [action.payload.object] };
  }

}
