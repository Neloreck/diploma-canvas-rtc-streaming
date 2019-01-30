import {ISerializedGraphicsObject} from "@Lib/graphics";

import {
  CONFIG,
  getRequest,
  IBookmarkResponse,
  IBookmarksResponse, IServerSerializedGraphicsObject,
  IXCoreFailedResponse,
  postRequest, putRequest
} from "@Api/x-core";
import {IBookmarkCreateRequest, IEventCreateRequest} from "@Api/x-core/live/requests";
import {
  IEventCreateResponse,
  IGetActiveEventResponse,
  IGetEventResponse,
  ILayoutBookmarkGraphicsResponse
} from "@Api/x-core/live/responses";

export const LIVE_MAPPING: string = CONFIG.X_CORE_SERVER_URL + "/api/live";

/*
 * UTILS:
 */

export const convertToServerSerializedGraphics = (item: ISerializedGraphicsObject): IServerSerializedGraphicsObject =>
  ({ className: item.className, configuration: JSON.stringify(item.configuration), position: JSON.stringify(item.position)});

export const convertFromServerSerializedGraphics = (item: IServerSerializedGraphicsObject): ISerializedGraphicsObject =>
  ({ className: item.className, configuration: JSON.parse(item.configuration), position: JSON.parse(item.position)});

/*
 * LIVE EVENT:
 */

export const checkActiveEvent = async (): Promise<IGetActiveEventResponse | IXCoreFailedResponse> =>
  await getRequest(`${LIVE_MAPPING}/stats/user/activeEvent`) as IGetActiveEventResponse;

export const getLiveEvent = async (eventId: string): Promise<IGetEventResponse | IXCoreFailedResponse> =>
  await getRequest(`${LIVE_MAPPING}/events/${eventId}`) as IGetEventResponse;

export const createLiveEvent = async (eventCreateRequest: IEventCreateRequest): Promise<IEventCreateResponse | IXCoreFailedResponse> =>
  await postRequest(`${LIVE_MAPPING}/events`, eventCreateRequest) as IEventCreateResponse;

export const getLiveEventBookmarks = async (eventId: string): Promise<IBookmarksResponse | IXCoreFailedResponse> =>
  await getRequest(`${LIVE_MAPPING}/events/${eventId}/bookmarks`) as IBookmarksResponse;

export const createLiveEventBookmark = async (eventId: string, request: IBookmarkCreateRequest): Promise<IBookmarkResponse | IXCoreFailedResponse> =>
  await postRequest(`${LIVE_MAPPING}/events/${eventId}/bookmarks`, request) as IBookmarkResponse;

/*
 * LAYOUT BOOKMARK:
 */

export const getBookmark = async (bookmarkId: number): Promise<IBookmarkResponse | IXCoreFailedResponse> =>
  await getRequest(`${LIVE_MAPPING}/bookmarks/${bookmarkId}`) as IBookmarkResponse;

export const getBookmarkGraphics = async (bookmarkId: number): Promise<ILayoutBookmarkGraphicsResponse | IXCoreFailedResponse> =>
  await getRequest(`${LIVE_MAPPING}/bookmarks/${bookmarkId}/graphics`) as ILayoutBookmarkGraphicsResponse;

export const setBookmarkGraphics = async (bookmarkId: number, request: { objects: Array<IServerSerializedGraphicsObject> }): Promise<ILayoutBookmarkGraphicsResponse | IXCoreFailedResponse> =>
  await putRequest(`${LIVE_MAPPING}/bookmarks/${bookmarkId}/graphics`, request) as ILayoutBookmarkGraphicsResponse;

// @ts-ignore
window.t = getRequest;
