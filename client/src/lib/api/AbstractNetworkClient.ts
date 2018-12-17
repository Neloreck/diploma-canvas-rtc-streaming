import {xCoreClientConfig} from "@Api/x-core";

import {ERequestMethod} from "@Api/x-core/exchange/ERequestMethod";
import {IXCoreFailedResponse} from "@Api/x-core/exchange/IXCoreFailedResponse";
import {IXCoreRequest} from "@Api/x-core/exchange/IXCoreRequest";
import {IXCoreResponse} from "@Api/x-core/exchange/IXCoreResponse";

export abstract class AbstractNetworkClient {

  public async get(mapping: string, urlParams?: {}, headers?: Headers): Promise<IXCoreResponse> {
    return this.doRequest(ERequestMethod.GET, mapping);
  }

  public async post(mapping: string, request: IXCoreRequest | URLSearchParams, headers?: Headers): Promise<IXCoreResponse | IXCoreFailedResponse> {
    return await this.doRequest(ERequestMethod.POST, mapping, request, headers);
  }

  public async delete(mapping: string, request: IXCoreRequest | URLSearchParams, headers?: Headers): Promise<IXCoreResponse> {
    return await this.doRequest(ERequestMethod.DELETE, mapping, request);
  }

  public async put(mapping: string, request: IXCoreRequest | URLSearchParams, headers?: Headers): Promise<IXCoreResponse> {
    return await this.doRequest(ERequestMethod.PUT, mapping, request);
  }

  private async doRequest(method: ERequestMethod, mapping: string, request?: IXCoreRequest | URLSearchParams, headers?: Headers): Promise<IXCoreResponse | IXCoreFailedResponse> {

    const requestBody = request instanceof URLSearchParams ? request : request && JSON.stringify(request);

    const rawRequest: RequestInit = {
      body: requestBody,
      headers: headers || xCoreClientConfig.getDefaultHeaders(),
      method
    };

    let rawResponse: Response | null = null;

    try {
      rawResponse = await fetch(xCoreClientConfig.getServerUrl() + mapping, rawRequest);

      if (rawResponse.status >= 500) {
        throw new Error("Could not reach auth server.");
      }

      if (rawResponse.status >= 400) {
        throw new Error("Bad credentials provided.");
      }

      return await rawResponse.json();
    } catch (error) {
      return {
        error,
        status: (!!rawResponse && (rawResponse as Response).status) || 400
      };
    }
  }

}
