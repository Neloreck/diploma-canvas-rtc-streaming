import {ActionWired, DataExchangeAction} from "redux-cbd";

@ActionWired("GRAPHICS_SET_PREVIEW_MODE")
export class SetPreviewModeAction extends DataExchangeAction<{ show: boolean } > {
}
