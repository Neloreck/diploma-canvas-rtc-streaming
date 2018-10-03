import {Provider} from "react-redux";
import {linkReactConnectWithStore} from "redux-cbd";

import {GlobalStoreManager} from "@Main/data/store/GlobalStoreManager";
import {IGlobalStoreState} from "@Main/data/store/IGlobalStoreState";

/* Global store utility: */
export const globalStoreManager: GlobalStoreManager = new GlobalStoreManager();
export const GlobalStoreProvider: typeof Provider = new GlobalStoreManager().getProvider();
export const GlobalConnect = linkReactConnectWithStore<IGlobalStoreState>(globalStoreManager.getStoreKey());

/* ReExport: */
export {GlobalStoreManager} from "@Main/data/store/GlobalStoreManager";
export {IGlobalStoreState} from "@Main/data/store/IGlobalStoreState";
