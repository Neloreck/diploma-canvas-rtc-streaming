import {reduxStoreManager} from "@Redux";
import {createAsyncActionType} from "redux-cbd";

export const AsyncReduxAction = createAsyncActionType(reduxStoreManager.getReduxStore().dispatch);
