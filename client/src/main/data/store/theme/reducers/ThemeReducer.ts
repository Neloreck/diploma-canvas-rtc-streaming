import {ActionHandler, ReflectiveReducer} from "redux-cbd";

import {UpdatePrimaryThemePaletteAction, UpdateSecondaryThemePaletteAction} from "@Main/data/store/theme/actions";
import {ThemeState} from "@Main/data/store/theme/store/ThemeState";

export class ThemeReducer extends ReflectiveReducer<ThemeState> {

  @ActionHandler
  public updatePrimaryPalette(state: ThemeState, action: UpdatePrimaryThemePaletteAction) {
    const newState = { ...state };

    if (!newState.options.palette) {
      newState.options.palette = {};
    }

    newState.options.palette.primary = action.payload.palette;

    return newState;
  }

  @ActionHandler
  public updateSecondaryPalette(state: ThemeState, action: UpdateSecondaryThemePaletteAction) {
    const newState = { ...state };

    if (!newState.options.palette) {
      newState.options.palette = {};
    }

    newState.options.palette.secondary = action.payload.palette;

    return newState;
  }

}
