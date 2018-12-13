import {AuthClient} from "@Api/x-core/auth/AuthClient";
import {XCoreApiConfig} from "@Api/x-core/XCoreApiConfig";

export const xCoreClientConfig: XCoreApiConfig = new XCoreApiConfig();
export const authClient: AuthClient = new AuthClient();

export {AuthClient} from "@Api/x-core/auth/AuthClient";
