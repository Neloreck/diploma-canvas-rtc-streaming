import {Provider} from "react-redux";
import {linkReactConnectWithStore} from "redux-cbd";

import {IStreamStoreState} from "@Module/stream/data/store/IStreamStoreState";
import {StreamStoreManager} from "@Module/stream/data/store/StreamStoreManager";

export const streamStoreManager: StreamStoreManager = new StreamStoreManager();
export const StreamStoreProvider: typeof Provider = streamStoreManager.getProvider();
export const StreamConnect = linkReactConnectWithStore<IStreamStoreState>(streamStoreManager.getStoreKey());

export {StreamStoreManager} from "@Module/stream/data/store/StreamStoreManager";
