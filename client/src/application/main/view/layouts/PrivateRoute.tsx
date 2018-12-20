import {Consume} from "@redux-cbd/context";
import * as React from "react";
import {Route, RouteProps} from "react-router";

// Data.
import {authContextManager, IAuthContext, IRouterContext, routerContextManager} from "@Main/data/store";
import {TypeUtils} from "@redux-cbd/utils";

// View.

// Props.
export interface IPrivateRouteOwnProps {
  reversed?: boolean;
  redirect: string;
}

export interface IPrivateRouteExternalProps extends IAuthContext, IRouterContext {}
export interface IPrivateRouteProps extends IPrivateRouteOwnProps, IPrivateRouteExternalProps, RouteProps {}

@Consume<IAuthContext, IPrivateRouteProps>(authContextManager)
@Consume<IRouterContext, IPrivateRouteProps>(routerContextManager)
export class PrivateRoute extends Route<IPrivateRouteProps> {

  public componentWillMount(): void {

    const {redirect, reversed, routingActions: {replace}, authState: {authorized, authorizing}} = this.props;

    if (authorizing === false && (reversed ? authorized : !authorized)) {
      replace(redirect);
    }
  }

  public componentWillReceiveProps(nextProps: IPrivateRouteProps): void {

    const {redirect, reversed, authState: {authorizing, authorized}, routingActions: {replace, getQueryParams}} = nextProps;
    const next: string | Array<string> = getQueryParams().next;

    if (authorizing === false && (reversed ? authorized : !authorized)) {
      replace(TypeUtils.isString(next) ? next as string : redirect);
    }
  }

}
