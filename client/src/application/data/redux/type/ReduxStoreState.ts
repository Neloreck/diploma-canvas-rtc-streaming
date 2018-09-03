import {reduxCreator} from "../";

const rootReducer = reduxCreator.reducers;

export type ReduxStoreState = typeof rootReducer;
