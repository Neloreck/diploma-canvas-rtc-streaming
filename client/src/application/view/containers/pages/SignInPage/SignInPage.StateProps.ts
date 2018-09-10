import {WithStyles} from "@material-ui/core";

import {signInPageStyle} from "./SignInPage.Style";

export interface ISignInPageStoreProps {
  authorizing: boolean;
}

export interface ISignInPageDispatchProps {
}

export interface ISignInPageOwnProps {
}

export interface ISignInPageProps extends ISignInPageDispatchProps, ISignInPageStoreProps, ISignInPageOwnProps,
  WithStyles<typeof signInPageStyle> {}
