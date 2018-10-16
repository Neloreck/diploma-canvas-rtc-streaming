import {ActionWired, DataExchangeAction} from "redux-cbd";

@ActionWired("GRAPHICS_SET_GRAPHICS_DISPLAY")
export class SetGraphicsDisplayAction extends DataExchangeAction<{ show: boolean } > {
}
