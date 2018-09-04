import {ReduxCreator} from "./ReduxCreator";
import {ReduxStoreManager} from "./ReduxStoreManager";

export const reduxCreator = new ReduxCreator();
export const reduxStoreManager = new ReduxStoreManager();

export {ReduxCreator} from "./ReduxCreator";
export {ReduxStoreManager} from "./ReduxStoreManager";
export {IReduxStoreState} from "./type/IReduxStoreState";
export {ReduxConnect} from "./ReduxConnect";
