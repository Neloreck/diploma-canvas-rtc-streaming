import {ERequestMethod} from "@Lib/api/types";

export abstract class AbstractNetworkClient {

  public abstract getHeaders(): Headers;

  public abstract getServerUrl(): string;

  public async get(mapping: string, urlParams?: {}, headers?: Headers): Promise<object> {
    return this.doRequest(ERequestMethod.GET, mapping);
  }

  public async post(mapping: string, request: object | URLSearchParams, headers?: Headers): Promise<object> {
    return await this.doRequest(ERequestMethod.POST, mapping, request, headers);
  }

  public async delete(mapping: string, request: object | URLSearchParams, headers?: Headers): Promise<object> {
    return await this.doRequest(ERequestMethod.DELETE, mapping, request);
  }

  public async put(mapping: string, request: object | URLSearchParams, headers?: Headers): Promise<object> {
    return await this.doRequest(ERequestMethod.PUT, mapping, request);
  }

  protected abstract async doRequest(method: ERequestMethod, mapping: string, request?: object | URLSearchParams, headers?: Headers): Promise<object>;

}
