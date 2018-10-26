import {ActionWired, DataExchangeAction} from "redux-cbd";

import {IInputSourceDevices} from "@Module/stream/data/store/source/models/IInputSourceDevices";

@ActionWired("SOURCE_UPDATE_INPUT_STREAM_AND_SOURCES")
export class UpdateInputStreamAndSourcesAction extends DataExchangeAction<{ stream: MediaStream, devices: IInputSourceDevices } > {
}
