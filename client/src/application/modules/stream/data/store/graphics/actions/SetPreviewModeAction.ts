import {ActionWired, DataExchangeAction} from "@redux-cbd/core";

@ActionWired("GRAPHICS_SET_PREVIEW_MODE")
export class SetPreviewModeAction extends DataExchangeAction<{ show: boolean } > {
}
