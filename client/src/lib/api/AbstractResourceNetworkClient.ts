import {ERequestMethod} from "@Lib/api/ERequestMethod";
import {IBaseRequest} from "@Lib/api/IBaseRequest";
import {IBaseResponse} from "@Lib/api/IBaseResponse";

export abstract class AbstractResourceNetworkClient {

  private static readonly HEADERS: Headers = new Headers({
    Accept: "application/json",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  });

  public async get(mapping: string, headers?: Headers): Promise<Blob | IBaseResponse> {
    return this.doRequest(ERequestMethod.GET, mapping, undefined, headers);
  }

  public loadImage(src: string): Promise<FileReader | null> {
    return new Promise(async (resolve: (reader: FileReader | null) => void, reject: (error: Error) => void) => {

      try {
        const blob: Blob = (await this.get(src)) as any;

        if (!Blob) {
          return reject(new Error("Failed to load resource " + src));
        }

        const reader: FileReader = new FileReader();

        reader.onload = (it: ProgressEvent): void => resolve(it.currentTarget as FileReader | null);
        reader.readAsDataURL(blob);
      } catch (error) {
        reject(error);
      }

    });

  }

  protected async doRequest(method: ERequestMethod, mapping: string, request?: IBaseRequest | URLSearchParams, headers?: Headers): Promise<IBaseResponse | Blob> {

    const requestBody: undefined | string | URLSearchParams = (request instanceof URLSearchParams ? request : request && JSON.stringify(request));

    const rawRequest: RequestInit = {
      body: requestBody,
      headers: headers || AbstractResourceNetworkClient.HEADERS,
      method
    };

    let rawResponse: Response | null = null;

    try {
      rawResponse = await fetch(mapping, rawRequest);

      if (rawResponse.status >= 500) {
        throw new Error("Could not reach requested server.");
      }

      if (rawResponse.status >= 400) {
        throw new Error("Bad credentials provided.");
      }

      return await rawResponse.blob();
    } catch (error) {
      return {
        error: error.message,
        status: (!!rawResponse && (rawResponse as Response).status) || 400,
        success: false
      };
    }
  }

}
