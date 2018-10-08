import {StreamStoreManager} from "@Module/stream/data/store/StreamStoreManager";

export const streamStoreManager: StreamStoreManager = new StreamStoreManager();
export const StreamStoreProvider = streamStoreManager.getProviderComponent();
export const StreamStoreConnect = streamStoreManager.getConsumerAnnotation();

export {StreamStoreManager} from "@Module/stream/data/store/StreamStoreManager";
