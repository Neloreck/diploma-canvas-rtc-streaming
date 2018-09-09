import {linkReactConnectWithStore} from "redux-cbd";

import {IGlobalStoreState} from "@Redux";

export const withConnection = linkReactConnectWithStore<IGlobalStoreState>();
