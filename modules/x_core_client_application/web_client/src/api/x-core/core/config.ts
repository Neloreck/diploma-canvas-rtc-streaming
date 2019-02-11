// Lib.
import { getFromLocalStorage } from "@Lib/utils";

export const CONFIG = {

  DEFAULT_HEADERS: new Headers({
    Accept: "application/json",
    "Content-Type": "application/json"
  }),

  X_CORE_SERVER_URL: process.env.X_CORE__API_SERVER_URL as string,

  getDefaultHeaders(): Headers {

    const tokenData: any = getFromLocalStorage("token_data");

    if (tokenData && tokenData.accessToken) {
      CONFIG.DEFAULT_HEADERS.set("Authorization", `Bearer ${tokenData.accessToken}`);
    } else {
      CONFIG.DEFAULT_HEADERS.delete("Authorization");
    }

    return CONFIG.DEFAULT_HEADERS;
  },

};
