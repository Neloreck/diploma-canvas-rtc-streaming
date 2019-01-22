// Lib.
import {DocumentStoreUtils} from "@Lib/utils";

export const CONFIG = {

  DEFAULT_HEADERS: new Headers({
    Accept: "application/json",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  }),

  X_CORE_CLIENT_ID: "X-CORE-CLIENT",
  X_CORE_CLIENT_SECRET: "eg2sHsu8qb765x65d",
  X_CORE_SERVER_URL: "http://localhost:3000",

  getDefaultHeaders(): Headers {

    const tokenData: any = DocumentStoreUtils.getFromLocalStorage("token_data");

    if (tokenData && tokenData.access_token) {
      CONFIG.DEFAULT_HEADERS.set("Authorization", `Bearer ${tokenData.access_token}`);
    } else {
      CONFIG.DEFAULT_HEADERS.delete("Authorization");
    }

    return CONFIG.DEFAULT_HEADERS;
  },

  getServerUrl(): string {
    return CONFIG.X_CORE_SERVER_URL;
  },

  getClientId(): string {
    return CONFIG.X_CORE_CLIENT_ID;
  },

  getClientSecret(): string {
    return CONFIG.X_CORE_CLIENT_SECRET;
  }
};
