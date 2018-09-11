import {ActionHandler, ReflectiveReducer} from "redux-cbd";

import {ThemeState} from "@Store/theme/store/ThemeState";

import {UpdatePrimaryThemePaletteAction, UpdateSecondaryThemePaletteAction} from "@Store/theme/actions";

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
