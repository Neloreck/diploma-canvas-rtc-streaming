import {routerReducer} from "react-router-redux";
import {combineReducers} from "redux";

import {Single} from "@App/data/utils/decorators";

import {AuthState} from "@Store/auth/models/AuthState";
import {AuthReducer} from "@Store/auth/reducers/AuthReducer";

@Single
export class ReduxCreator {

  private readonly rootReducer = combineReducers( {
    auth: new AuthReducer().asFunctional(new AuthState(), { freeze: true }),
    routing: routerReducer
  });

  public getRootReducer() {
    return this.rootReducer;
  }

}
