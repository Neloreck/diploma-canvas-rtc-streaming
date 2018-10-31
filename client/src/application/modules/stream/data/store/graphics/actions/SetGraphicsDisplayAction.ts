import {ActionWired, DataExchangeAction} from "@redux-cbd/core";

@ActionWired("GRAPHICS_SET_GRAPHICS_DISPLAY")
export class SetGraphicsDisplayAction extends DataExchangeAction<{ show: boolean } > {
}
