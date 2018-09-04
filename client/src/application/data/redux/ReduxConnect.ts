import {IReduxStoreState} from "@App/data/redux/type/IReduxStoreState";
import {linkConnectWithStore} from "@Lib/decorated-redux";

export const ReduxConnect = linkConnectWithStore<IReduxStoreState>();
