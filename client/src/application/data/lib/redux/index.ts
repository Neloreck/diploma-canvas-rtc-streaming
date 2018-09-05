import {ReduxCreator} from "./service/ReduxCreator";
import {ReduxStoreManager} from "./service/ReduxStoreManager";

export const reduxCreator = new ReduxCreator();
export const reduxStoreManager = new ReduxStoreManager();

export {ReduxCreator} from "./service/ReduxCreator";
export {ReduxStoreManager} from "./service/ReduxStoreManager";
export {IReduxStoreState} from "./type/IReduxStoreState";
export {ReduxConnect} from "./util/ReduxConnect";
