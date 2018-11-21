import {ERequestMethod} from "./exchange/ERequestMethod";
import {xCoreClientConfig} from "./index";

import {IXCoreFailedResponse} from "./exchange/IXCoreFailedResponse";
import {IXCoreRequest} from "./exchange/IXCoreRequest";
import {IXCoreResponse} from "./exchange/IXCoreResponse";

export abstract class XCoreClient {

  // todo: Url params mapping.
  public async get(mapping: string, urlParams?: {}): Promise<IXCoreResponse> {
    return this.doRequest(ERequestMethod.GET, mapping);
  }

  public async post(mapping: string, request: IXCoreRequest): Promise<IXCoreResponse | IXCoreFailedResponse> {
    return this.doRequest(ERequestMethod.POST, mapping, request);
  }

  public async delete(mapping: string, request: IXCoreRequest): Promise<IXCoreResponse> {
    return this.doRequest(ERequestMethod.DELETE, mapping, request);
  }

  public async put(mapping: string, request: IXCoreRequest): Promise<IXCoreResponse> {
    return this.doRequest(ERequestMethod.PUT, mapping, request);
  }

  private async doRequest(method: ERequestMethod, mapping: string, request?: IXCoreRequest): Promise<IXCoreResponse | IXCoreFailedResponse> {

    const rawRequest: RequestInit = {
      body: request ? JSON.stringify(request) : undefined,
      headers: xCoreClientConfig.getDefaultHeaders(),
      method
    };

    let rawResponse: Response | null = null;

    try {
      rawResponse = await fetch(xCoreClientConfig.getServerUrl() + mapping, rawRequest);
      return await rawResponse.json();
    } catch (error) {
      return {
        error,
        mapping,
        status: (!!rawResponse && (rawResponse as Response).status),
        success: false
      };
    }
  }

}
