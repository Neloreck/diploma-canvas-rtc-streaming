import {AbstractNetworkClient} from "@Lib/api/AbstractNetworkClient";
import {ERequestMethod} from "@Lib/api/ERequestMethod";
import {IBaseRequest} from "@Lib/api/IBaseRequest";
import {IBaseResponse} from "@Lib/api/IBaseResponse";

export abstract class AbstractRestNetworkClient extends AbstractNetworkClient {

  protected async doRequest(method: ERequestMethod, mapping: string, request?: IBaseRequest | URLSearchParams, headers?: Headers): Promise<IBaseResponse> {

    const requestBody: string | undefined | URLSearchParams = request instanceof URLSearchParams ? request : request && JSON.stringify(request);

    const rawRequest: RequestInit = {
      body: requestBody,
      headers: headers || this.getHeaders(),
      method
    };

    let rawResponse: Response | null = null;

    try {
      rawResponse = await fetch(this.getServerUrl() + mapping, rawRequest);

      if (rawResponse.status >= 500) {
        throw new Error("Could not reach auth server.");
      }

      return await rawResponse.json();
    } catch (error) {
      return {
        error: error.message,
        status: (!!rawResponse && (rawResponse as Response).status) || 400,
        success: false
      };
    }
  }

}
