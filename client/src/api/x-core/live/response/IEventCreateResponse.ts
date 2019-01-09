import {IXCoreResponse} from "@Api/x-core/general/IXCoreResponse";
import {ILiveEvent} from "@Api/x-core/live/models";

export interface IEventCreateResponse extends IXCoreResponse {
  liveEvent: ILiveEvent;
  owner: number;
}
