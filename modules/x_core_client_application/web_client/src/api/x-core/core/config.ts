// Lib.
import {DocumentStoreUtils} from "@Lib/utils";

export const CONFIG = {

  DEFAULT_HEADERS: new Headers({
    Accept: "application/json",
    "Content-Type": "application/json"
  }),

  X_CORE_CLIENT_ID: process.env.X_CORE__CLIENT_ID as string,
  X_CORE_CLIENT_SECRET: process.env.X_CORE__CLIENT_SECRET as string,
  X_CORE_SERVER_URL: process.env.X_CORE__SERVER_URL as string,

  getDefaultHeaders(): Headers {

    const tokenData: any = DocumentStoreUtils.getFromLocalStorage("token_data");

    if (tokenData && tokenData.accessToken) {
      CONFIG.DEFAULT_HEADERS.set("Authorization", `Bearer ${tokenData.accessToken}`);
    } else {
      CONFIG.DEFAULT_HEADERS.delete("Authorization");
    }

    return CONFIG.DEFAULT_HEADERS;
  },

};
