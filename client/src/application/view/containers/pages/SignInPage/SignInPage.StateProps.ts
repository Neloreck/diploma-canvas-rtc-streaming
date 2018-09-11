import {WithStyles} from "@material-ui/core";

import {signInPageStyle} from "./SignInPage.Style";

export interface ISignInPageStoreProps {
  authorizing: boolean;
}

export interface ISignInPageDispatchProps {
}

export interface ISignInPageExternalProps extends ISignInPageDispatchProps, ISignInPageStoreProps,
  WithStyles<typeof signInPageStyle> {}

export interface ISignInPageOwnProps {
}

export interface ISignInPageProps extends ISignInPageOwnProps, ISignInPageExternalProps {}
