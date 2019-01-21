import {ERequestMethod} from "@Lib/api/types";

const getHeaders: () => Headers = (): Headers => new Headers({
  Accept: "application/json",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json"
});

const getRequest: (mapping: string, headers?: Headers) => Promise<Blob | object> = async (mapping: string, headers?: Headers): Promise<Blob | object> =>
  doRequest(ERequestMethod.GET, mapping, undefined, headers);

export const loadImage: (src: string) => Promise<FileReader | null> = (src: string): Promise<FileReader | null> => {
  return new Promise(async (resolve: (reader: FileReader | null) => void, reject: (error: Error) => void): Promise<void> => {

    try {
      const blob: Blob = (await getRequest(src)) as any;

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

};

export const doRequest: (method: ERequestMethod, mapping: string, request?: object | URLSearchParams, headers?: Headers)
  => Promise<object | Blob> = async (method: ERequestMethod, mapping: string, request?: object | URLSearchParams, headers?: Headers): Promise<object | Blob> => {

  const requestBody: undefined | string | URLSearchParams = (request instanceof URLSearchParams ? request : request && JSON.stringify(request));

  const rawRequest: RequestInit = {
    body: requestBody,
    headers: headers || getHeaders(),
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
};
