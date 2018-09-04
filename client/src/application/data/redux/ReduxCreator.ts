import {routerReducer} from "react-router-redux";
import {combineReducers} from "redux";

import {createReflectiveReducer} from "@Lib/decorated-redux";

import {Single} from "@App/data/utils/decorators";
import {AuthState} from "@Store/auth/models/AuthState";
import {AuthReducer} from "@Store/auth/reducers/AuthReducer";

@Single
export class ReduxCreator {

  private readonly reducers = {
    auth: createReflectiveReducer(AuthReducer, new AuthState(), { freeze: true }),
    routing: routerReducer
  };

  private readonly rootReducer = combineReducers(this.reducers);

  public getRootReducer() {
    return this.rootReducer;
  }

}
