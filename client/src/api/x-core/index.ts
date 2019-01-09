import {log} from "@Lib/utils";

import {AuthClient} from "@Api/x-core/auth/AuthClient";
import {LiveClient} from "@Api/x-core/live/LiveClient";
import {XCoreApiConfig} from "@Api/x-core/XCoreApiConfig";

export const xCoreClientConfig: XCoreApiConfig = new XCoreApiConfig();

export const authClient: AuthClient = new AuthClient();
export const liveClient: LiveClient = new LiveClient();

/*
 * Expose API clients for dev purposes.
 */

if (xCoreClientConfig.exposeClientsToWindow) {

  log.warn("Exposing x-core api clients for DEV mode.");

  // @ts-ignore DEV feature.
  window.x_api = {
    authClient,
    liveClient,
    xCoreClientConfig
  };
}

export {AuthClient} from "@Api/x-core/auth/AuthClient";
