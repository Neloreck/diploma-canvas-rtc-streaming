import {ActionWired, DataExchangeAction} from "@redux-cbd/core";

import {Optional} from "@Lib/ts/type";

@ActionWired("INPUT_SOURCE_CHANGE_INPUT_STREAM")
export class ChangeInputMediaStreamAction extends DataExchangeAction<{ stream: Optional<MediaStream> }> {
}
