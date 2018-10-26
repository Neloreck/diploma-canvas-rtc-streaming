import {GlobalStoreManager} from "@Main/data/store/GlobalStoreManager";
import {IGlobalStoreState} from "@Main/data/store/IGlobalStoreState";

/* Global store utility: */
export const globalStoreManager: GlobalStoreManager = new GlobalStoreManager();
export const GlobalStoreProvider = globalStoreManager.getProviderComponent();
export const GlobalStoreConnect = globalStoreManager.getConsumerAnnotation();

/* ReExport: */
export {GlobalStoreManager} from "@Main/data/store/GlobalStoreManager";
export {IGlobalStoreState} from "@Main/data/store/IGlobalStoreState";
