import {ActionWired, DataExchangeAction} from "@redux-cbd/core";

@ActionWired("GRAPHICS_SET_GRID_DISPLAY")
export class SetGridDisplayAction extends DataExchangeAction<{ show: boolean } > {
}
