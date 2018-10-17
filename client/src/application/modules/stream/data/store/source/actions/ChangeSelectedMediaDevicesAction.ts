import {ActionWired, DataExchangeAction} from "redux-cbd";

import {IInputSourceDevices} from "../models/IInputSourceDevices";

@ActionWired("INPUT_SOURCE_CHANGE_MEDIA_DEVICES")
export class ChangeSelectedMediaDevicesAction extends DataExchangeAction<IInputSourceDevices> {
}
