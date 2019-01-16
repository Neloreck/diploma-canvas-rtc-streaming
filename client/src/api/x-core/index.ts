import {log} from "@Lib/utils";

import {ApiConfig} from "@Api/x-core/ApiConfig";
import {AuthClient} from "@Api/x-core/auth/AuthClient";
import {LiveClient} from "@Api/x-core/live/LiveClient";

/*
 * RE-EXPORT:
 */

export * from "@Api/x-core/general";
export * from "@Api/x-core/auth";
export * from "@Api/x-core/live";

export const xCoreClientConfig: ApiConfig = new ApiConfig();
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
