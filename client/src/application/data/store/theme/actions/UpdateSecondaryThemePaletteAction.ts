import {ActionWired, SimpleAction} from "redux-cbd";

import {PaletteColorOptions} from "@material-ui/core/styles/createPalette";

@ActionWired("THEME_UPDATE_PALETTE_SECONDARY")
export class UpdateSecondaryThemePaletteAction extends SimpleAction {

  public payload: { palette: PaletteColorOptions } = { palette: ({} as PaletteColorOptions) };

  public constructor(palette: PaletteColorOptions) {
    super();

    this.payload.palette = palette;
  }

}
