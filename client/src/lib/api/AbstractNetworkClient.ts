import {ERequestMethod} from "@Lib/api/ERequestMethod";
import {IBaseRequest} from "@Lib/api/IBaseRequest";
import {IBaseResponse} from "@Lib/api/IBaseResponse";

export abstract class AbstractNetworkClient {

  public abstract getHeaders(): Headers;

  public abstract getServerUrl(): string;

  public async get(mapping: string, urlParams?: {}, headers?: Headers): Promise<IBaseResponse> {
    return this.doRequest(ERequestMethod.GET, mapping);
  }

  public async post(mapping: string, request: IBaseRequest | URLSearchParams, headers?: Headers): Promise<IBaseResponse> {
    return await this.doRequest(ERequestMethod.POST, mapping, request, headers);
  }

  public async delete(mapping: string, request: IBaseRequest | URLSearchParams, headers?: Headers): Promise<IBaseResponse> {
    return await this.doRequest(ERequestMethod.DELETE, mapping, request);
  }

  public async put(mapping: string, request: IBaseRequest | URLSearchParams, headers?: Headers): Promise<IBaseResponse> {
    return await this.doRequest(ERequestMethod.PUT, mapping, request);
  }

  protected abstract async doRequest(method: ERequestMethod, mapping: string, request?: IBaseRequest | URLSearchParams, headers?: Headers): Promise<IBaseResponse>;

}
