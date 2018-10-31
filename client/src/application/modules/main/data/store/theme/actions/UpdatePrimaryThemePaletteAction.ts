import {ActionWired, SimpleAction} from "@redux-cbd/core";

import {PaletteColorOptions} from "@material-ui/core/styles/createPalette";

@ActionWired("THEME_UPDATE_PALETTE_PRIMARY")
export class UpdatePrimaryThemePaletteAction extends SimpleAction {

  public payload: { palette: PaletteColorOptions } = { palette: ({} as PaletteColorOptions) };

  public constructor(palette: PaletteColorOptions) {
    super();

    this.payload.palette = palette;
  }

}
