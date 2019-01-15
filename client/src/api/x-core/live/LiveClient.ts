import {AbstractRestNetworkClient} from "@Lib/api/AbstractRestNetworkClient";

import {xCoreClientConfig} from "@Api/x-core";

import {IXCoreFailedResponse} from "@Api/x-core/general/IXCoreFailedResponse";
import {IEventCreateRequest} from "@Api/x-core/live/request/IEventCreateRequest";
import {IEventCreateResponse} from "@Api/x-core/live/response/IEventCreateResponse";
import {IGetEventResponse} from "@Api/x-core/live/response/IGetEventResponse";

export class LiveClient extends AbstractRestNetworkClient {

  private static LIVE_MAPPING: string = "/api/live";

  public getHeaders: () => Headers = xCoreClientConfig.getDefaultHeaders;
  public getServerUrl: () => string = xCoreClientConfig.getServerUrl;

  // Actions:

  public async getLiveEvent(eventId: string): Promise<IGetEventResponse | IXCoreFailedResponse> {
    return await this.get(LiveClient.LIVE_MAPPING + "/event/" + eventId) as IGetEventResponse;
  }

  public async createLiveEvent(eventCreateRequest: IEventCreateRequest): Promise<IEventCreateResponse | IXCoreFailedResponse> {
    return await this.post(LiveClient.LIVE_MAPPING + "/event", eventCreateRequest) as IEventCreateResponse;
  }

}
