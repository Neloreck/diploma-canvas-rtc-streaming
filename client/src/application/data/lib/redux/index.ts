import {ReduxCreator} from "./services/ReduxCreator";
import {ReduxStoreManager} from "./services/ReduxStoreManager";

export const reduxCreator = new ReduxCreator();
export const reduxStoreManager = new ReduxStoreManager();

export {ReduxCreator} from "./services/ReduxCreator";
export {ReduxStoreManager} from "./services/ReduxStoreManager";
export {IReduxStoreState} from "./types/IReduxStoreState";
export {ReduxConnect} from "./annotations/ReduxConnect";
