import {ISerializedGraphicsObject} from "@Lib/graphics";

import {IXCoreResponse} from "@Api/x-core";
import {ILiveEvent, ILiveEventLayoutBookmark} from "@Api/x-core/live/models";

export interface IEventCreateResponse extends IXCoreResponse {
  liveEvent: ILiveEvent;
  owner: number;
}

export interface IGetActiveEventResponse extends IXCoreResponse {
  liveEvent: ILiveEvent | null;
}

export interface IGetEventResponse extends IXCoreResponse {
  liveEvent: ILiveEvent;
}

export interface IBookmarkResponse extends IXCoreResponse {
  liveEventId: string;
  bookmark: ILiveEventLayoutBookmark;
}

export interface IBookmarksResponse extends IXCoreResponse {
  liveEventId: string;
  bookmarks: Array<ILiveEventLayoutBookmark>;
}

export interface ILayoutBookmarkGraphicsResponse extends IXCoreResponse {
  liveEventId: string;
  bookmarkId: number;
  objects: Array<ISerializedGraphicsObject>;
}
