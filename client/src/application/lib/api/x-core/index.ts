import {XCoreClient} from "./_core/XCoreClient";
import {XCoreClientConfig} from "./_core/XCoreClientConfig";

import {AuthClient} from "./auth/AuthClient";

export const xCoreClientConfig: XCoreClientConfig = new XCoreClientConfig();

export const xCoreClient: XCoreClient = new XCoreClient();
export const authClient: AuthClient = new AuthClient();

export {AuthClient} from "./auth/AuthClient";
