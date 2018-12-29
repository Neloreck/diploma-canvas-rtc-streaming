import {AuthClient} from "@Api/x-core/auth/AuthClient";
import {XCoreApiConfig} from "@Api/x-core/XCoreApiConfig";
import {log} from "@Lib/utils";

export const xCoreClientConfig: XCoreApiConfig = new XCoreApiConfig();
export const authClient: AuthClient = new AuthClient();

/*
 * Expose API clients for dev purposes.
 */

if (xCoreClientConfig.exposeClientsToWindow) {

  log.warn("Exposing api clients for DEV mode.");

  // @ts-ignore DEV feature.
  window.api = {
    xCore: {
      authClient,
      xCoreClientConfig
    }
  };
}

export {AuthClient} from "@Api/x-core/auth/AuthClient";
