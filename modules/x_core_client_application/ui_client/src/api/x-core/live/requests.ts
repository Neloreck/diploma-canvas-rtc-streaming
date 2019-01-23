import {IXCoreRequest} from "@Api/x-core";

export interface IBookmarkCreateRequest extends IXCoreRequest {
  name: string;
}

export interface IEventCreateRequest extends IXCoreRequest {
  name: string;
  description: string;
  secured: boolean;
  securedKey: string | null;
}
