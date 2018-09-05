import {linkConnectWithStore} from "../../../../../lib/decorated-redux/index";
import {IReduxStoreState} from "../type/IReduxStoreState";

export const ReduxConnect = linkConnectWithStore<IReduxStoreState>();
