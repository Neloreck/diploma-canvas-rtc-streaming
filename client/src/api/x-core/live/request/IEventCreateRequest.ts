import {IXCoreRequest} from "@Api/x-core/general/IXCoreRequest";

export interface IEventCreateRequest extends IXCoreRequest {
  name: string;
  description: string;
  secured: boolean;
  securedKey: string | null;
}
