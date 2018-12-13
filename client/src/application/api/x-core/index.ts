import {XCoreClient} from "./XCoreClient";
import {XCoreClientConfig} from "./XCoreClientConfig";

import {AuthClient} from "./auth/AuthClient";

export const xCoreClientConfig: XCoreClientConfig = new XCoreClientConfig();
export const authClient: AuthClient = new AuthClient();

export {AuthClient} from "./auth/AuthClient";
