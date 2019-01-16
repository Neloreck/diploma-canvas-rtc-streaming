import {AbstractRestNetworkClient} from "@Lib/api/AbstractRestNetworkClient";

import {IBookmarkResponse, IBookmarksResponse, IXCoreFailedResponse, xCoreClientConfig} from "@Api/x-core";
import {IBookmarkCreateRequest, IEventCreateRequest} from "@Api/x-core/live/requests";
import {IEventCreateResponse, IGetEventResponse, ILayoutBookmarkGraphicsResponse} from "@Api/x-core/live/responses";

export class LiveClient extends AbstractRestNetworkClient {

  private static LIVE_MAPPING: string = "/api/live";

  public getHeaders: () => Headers = xCoreClientConfig.getDefaultHeaders;
  public getServerUrl: () => string = xCoreClientConfig.getServerUrl;

  // Actions:

  /*
   * EVENT:
   */

  public async getLiveEvent(eventId: string): Promise<IGetEventResponse | IXCoreFailedResponse> {
    return await this.get(`${LiveClient.LIVE_MAPPING}/events/${eventId}`) as IGetEventResponse;
  }

  public async createLiveEvent(eventCreateRequest: IEventCreateRequest): Promise<IEventCreateResponse | IXCoreFailedResponse> {
    return await this.post(`${LiveClient.LIVE_MAPPING}/events`, eventCreateRequest) as IEventCreateResponse;
  }

  public async getLiveEventBookmarks(eventId: string): Promise<IBookmarksResponse | IXCoreFailedResponse> {
    return await this.get(`${LiveClient.LIVE_MAPPING}/events/${eventId}/bookmarks`) as IBookmarksResponse;
  }

  public async createLiveEventBookmark(eventId: string, request: IBookmarkCreateRequest): Promise<IBookmarkResponse | IXCoreFailedResponse> {
    return await this.post(`${LiveClient.LIVE_MAPPING}/events/${eventId}/bookmarks`, request) as IBookmarkResponse;
  }

  /*
   * LAYOUT BOOKMARK:
   */

  public async getBookmark(bookmarkId: number): Promise<IBookmarkResponse | IXCoreFailedResponse> {
    return await this.get(`${LiveClient.LIVE_MAPPING}/bookmarks/${bookmarkId}`) as IBookmarkResponse;
  }

  public async getBookmarkGraphics(bookmarkId: number): Promise<ILayoutBookmarkGraphicsResponse | IXCoreFailedResponse> {
    return await this.get(`${LiveClient.LIVE_MAPPING}/bookmarks/${bookmarkId}/graphics`) as ILayoutBookmarkGraphicsResponse;
  }

  // todo;
  public async setBookmarkGraphics(bookmarkId: number, request: { objects: Array<any> }): Promise<ILayoutBookmarkGraphicsResponse | IXCoreFailedResponse> {
    return await this.post(`${LiveClient.LIVE_MAPPING}/bookmarks/${bookmarkId}/graphics`, request) as ILayoutBookmarkGraphicsResponse;
  }

}
